// FarhangLexDB - High-Performance IndexedDB Storage Layer with Atomic Updates & Clean Reset
// Architecture: Version 3.1.0 | Offline-First, Resilient & Split-Brain-Free
(function (window) {
  'use strict';

  const DB_NAME = 'FarhangLexDB';
  const DB_VERSION = 1;
  const RESTORE_JOURNAL = 'farhanglex_restore_journal_v1';
  const restoreKeyOK = key => /^(farhanglex_settings_v21|farhanglex_gamification_v30|farhanglex_weekly_history|farhanglex_progress_(prospect_[123]|vision_[123]))$/.test(key);
  let restoreBusy = false;

  function applyRestoreValues(values) {
    Object.keys(values).forEach(key => {
      const value = values[key];
      if (!restoreKeyOK(key) || !(value === null || typeof value === 'string')) throw new Error('شناسهٔ بازیابی نامعتبر است');
      if (value === null) localStorage.removeItem(key); else localStorage.setItem(key, value);
      if (localStorage.getItem(key) !== value) throw new Error('تأیید ذخیرهٔ بازیابی ناموفق بود');
    });
  }

  function removeRestoreJournal() {
    localStorage.removeItem(RESTORE_JOURNAL);
    if (localStorage.getItem(RESTORE_JOURNAL) !== null) throw new Error('پاک‌سازی نشان بازیابی ناموفق بود');
  }

  let dbInstance = null;
  let isFallbackMode = false;
  let fallbackStorage = {
    word_progress: {},
    gamification: { id: 'main', streak: 1, gems: 25, lastActiveDate: '', unlockedThemes: ['default'] },
    settings: { id: 'main', accent: 'en-US', autoPlay: false, theme: 'default', dailyNewCards: 20 },
    history: {},
  };

  const FarhangLexDB = {
    async init() {
      if (typeof window === 'undefined' || !window.indexedDB) {
        isFallbackMode = true;
        this._loadFallbackFromLocalStorage();
        return this;
      }

      return new Promise((resolve) => {
        try {
          const request = window.indexedDB.open(DB_NAME, DB_VERSION);

          request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('word_progress')) {
              const progressStore = db.createObjectStore('word_progress', { keyPath: 'wordId' });
              progressStore.createIndex('by_grade', 'gradeId', { unique: false });
              progressStore.createIndex('by_box', 'box', { unique: false });
              progressStore.createIndex('by_next_review', 'nextReview', { unique: false });
            }
            if (!db.objectStoreNames.contains('gamification')) {
              db.createObjectStore('gamification', { keyPath: 'id' });
            }
            if (!db.objectStoreNames.contains('settings')) {
              db.createObjectStore('settings', { keyPath: 'id' });
            }
            if (!db.objectStoreNames.contains('history')) {
              db.createObjectStore('history', { keyPath: 'date' });
            }
          };

          request.onsuccess = (event) => {
            dbInstance = event.target.result;
            resolve(this);
          };

          request.onerror = () => {
            isFallbackMode = true;
            this._loadFallbackFromLocalStorage();
            resolve(this);
          };
        } catch (e) {
          isFallbackMode = true;
          this._loadFallbackFromLocalStorage();
          resolve(this);
        }
      });
    },

    async migrateFromLocalStorage(curriculumMap) {
      if (typeof localStorage === 'undefined') return;
      if (localStorage.getItem('farhanglex_migrated_to_idb') === 'true') return;

      try {
        const legacyToStableMap = {};
        const gradesObj = (curriculumMap && curriculumMap.grades) ? curriculumMap.grades : curriculumMap;
        if (gradesObj) {
          Object.keys(gradesObj).forEach(gKey => {
            const grade = gradesObj[gKey];
            if (!grade || typeof grade !== 'object') return;
            const voc = grade.vocabulary || grade._combinedVocab || [];
            voc.forEach(w => {
              if (w.legacyId && w.id) {
                legacyToStableMap[w.legacyId] = { stableId: w.id, gradeId: gKey };
              }
              if (w.id) {
                legacyToStableMap[w.id] = { stableId: w.id, gradeId: gKey };
              }
            });
          });
        }

        const gradeKeys = ['prospect_1', 'prospect_2', 'prospect_3', 'vision_1', 'vision_2', 'vision_3'];
        for (const gKey of gradeKeys) {
          const oldDataStr = localStorage.getItem(`farhanglex_progress_${gKey}`)
                          || localStorage.getItem(`farhanglex_progress_${gKey}_v21`);
          if (oldDataStr) {
            try {
              const oldProgressObj = JSON.parse(oldDataStr);
              for (const [key, oldRec] of Object.entries(oldProgressObj)) {
                const mapping = legacyToStableMap[key] || { stableId: key, gradeId: gKey };
                await this.saveWordProgress({
                  wordId: mapping.stableId,
                  gradeId: mapping.gradeId || gKey,
                  box: oldRec.box || 1,
                  easeFactor: oldRec.easeFactor || 2.5,
                  interval: oldRec.interval || 1,
                  repetitions: oldRec.repetitions || 0,
                  lapses: oldRec.lapses || oldRec.fail || 0,
                  success: oldRec.success || 0,
                  fail: oldRec.fail || 0,
                  starred: !!oldRec.starred,
                  lastReview: oldRec.lastReview || 0,
                  nextReview: oldRec.nextReview || (Date.now() + 86400000),
                  masteryAwarded: !!oldRec.masteryAwarded,
                  updatedAt: Date.now()
                });
              }
            } catch (err) {}
          }
        }

        localStorage.setItem('farhanglex_migrated_to_idb', 'true');
      } catch (e) {}
    },

    async saveWordProgress(record) {
      if (!record || !record.wordId) return false;

      if (isFallbackMode || !dbInstance) {
        fallbackStorage.word_progress[record.wordId] = Object.assign({}, record);
        this._saveFallbackToLocalStorage();
        return true;
      }

      return new Promise((resolve) => {
        try {
          const tx = dbInstance.transaction('word_progress', 'readwrite');
          tx.objectStore('word_progress').put(record);
          tx.oncomplete = () => resolve(true);
          tx.onerror = () => resolve(false);
        } catch (e) {
          resolve(false);
        }
      });
    },

    async getWordProgress(wordId) {
      if (!wordId) return null;
      if (isFallbackMode || !dbInstance) {
        return fallbackStorage.word_progress[wordId] || null;
      }

      return new Promise((resolve) => {
        try {
          const tx = dbInstance.transaction('word_progress', 'readonly');
          const req = tx.objectStore('word_progress').get(wordId);
          req.onsuccess = () => resolve(req.result || null);
          req.onerror = () => resolve(null);
        } catch (e) {
          resolve(null);
        }
      });
    },

    async getAllProgressForGrade(gradeId) {
      if (isFallbackMode || !dbInstance) {
        const result = {};
        Object.values(fallbackStorage.word_progress).forEach(r => {
          if (r.gradeId === gradeId) result[r.wordId] = r;
        });
        return result;
      }

      return new Promise((resolve) => {
        try {
          const tx = dbInstance.transaction('word_progress', 'readonly');
          const index = tx.objectStore('word_progress').index('by_grade');
          const req = index.getAll(gradeId);
          req.onsuccess = () => {
            const dict = {};
            (req.result || []).forEach(r => { dict[r.wordId] = r; });
            resolve(dict);
          };
          req.onerror = () => resolve({});
        } catch (e) {
          resolve({});
        }
      });
    },

    // Fixed in v3.1.0: Cleanly delete all IndexedDB records for a specific grade on Reset!
    async clearGradeProgress(gradeId) {
      if (!gradeId) return false;
      if (isFallbackMode || !dbInstance) {
        Object.keys(fallbackStorage.word_progress).forEach(k => {
          if (fallbackStorage.word_progress[k].gradeId === gradeId || k.startsWith(gradeId + ':')) {
            delete fallbackStorage.word_progress[k];
          }
        });
        this._saveFallbackToLocalStorage();
        return true;
      }

      return new Promise((resolve) => {
        try {
          const tx = dbInstance.transaction('word_progress', 'readwrite');
          const store = tx.objectStore('word_progress');
          const req = store.getAll();
          req.onsuccess = () => {
            (req.result || []).forEach(rec => {
              if (rec.gradeId === gradeId || (rec.wordId && rec.wordId.startsWith(gradeId + ':'))) {
                store.delete(rec.wordId);
              }
            });
          };
          tx.oncomplete = () => resolve(true);
          tx.onerror = () => resolve(false);
        } catch (e) {
          resolve(false);
        }
      });
    },

    async clearAllProgress() {
      if (isFallbackMode || !dbInstance) {
        fallbackStorage.word_progress = {};
        this._saveFallbackToLocalStorage();
        return true;
      }
      return new Promise((resolve) => {
        try {
          const tx = dbInstance.transaction('word_progress', 'readwrite');
          tx.objectStore('word_progress').clear();
          tx.oncomplete = () => resolve(true);
          tx.onerror = () => resolve(false);
        } catch (e) {
          resolve(false);
        }
      });
    },

    async saveGamification(gameData) {
      const data = Object.assign({ id: 'main' }, gameData);
      if (isFallbackMode || !dbInstance) {
        fallbackStorage.gamification = data;
        this._saveFallbackToLocalStorage();
        return true;
      }
      return new Promise((resolve) => {
        try {
          const tx = dbInstance.transaction('gamification', 'readwrite');
          tx.objectStore('gamification').put(data);
          tx.oncomplete = () => resolve(true);
          tx.onerror = () => resolve(false);
        } catch (e) { resolve(false); }
      });
    },

    async getGamification() {
      if (isFallbackMode || !dbInstance) return fallbackStorage.gamification;
      return new Promise((resolve) => {
        try {
          const tx = dbInstance.transaction('gamification', 'readonly');
          const req = tx.objectStore('gamification').get('main');
          req.onsuccess = () => resolve(req.result || null);
          req.onerror = () => resolve(null);
        } catch (e) { resolve(null); }
      });
    },

    async saveSettings(settingsData) {
      const data = Object.assign({ id: 'main' }, settingsData);
      if (isFallbackMode || !dbInstance) {
        fallbackStorage.settings = data;
        this._saveFallbackToLocalStorage();
        return true;
      }
      return new Promise((resolve) => {
        try {
          const tx = dbInstance.transaction('settings', 'readwrite');
          tx.objectStore('settings').put(data);
          tx.oncomplete = () => resolve(true);
          tx.onerror = () => resolve(false);
        } catch (e) { resolve(false); }
      });
    },

    async getSettings() {
      if (isFallbackMode || !dbInstance) return fallbackStorage.settings;
      return new Promise((resolve) => {
        try {
          const tx = dbInstance.transaction('settings', 'readonly');
          const req = tx.objectStore('settings').get('main');
          req.onsuccess = () => resolve(req.result || null);
          req.onerror = () => resolve(null);
        } catch (e) { resolve(null); }
      });
    },

    async recordReviewActivity(dateStr, count = 1, overwrite = false) {
      if (isFallbackMode || !dbInstance) {
        fallbackStorage.history[dateStr] = overwrite ? count : ((fallbackStorage.history[dateStr] || 0) + count);
        this._saveFallbackToLocalStorage();
        return true;
      }
      return new Promise((resolve) => {
        try {
          const tx = dbInstance.transaction('history', 'readwrite');
          const store = tx.objectStore('history');
          const req = store.get(dateStr);
          req.onsuccess = () => {
            const current = req.result ? req.result.count : 0;
            store.put({ date: dateStr, count: overwrite ? count : (current + count) });
            resolve(true);
          };
          req.onerror = () => resolve(false);
        } catch (e) { resolve(false); }
      });
    },

    async getWeeklyHistory() {
      if (isFallbackMode || !dbInstance) return Object.assign({}, fallbackStorage.history);
      return new Promise((resolve) => {
        try {
          const tx = dbInstance.transaction('history', 'readonly');
          const req = tx.objectStore('history').getAll();
          req.onsuccess = () => {
            const dict = {};
            (req.result || []).forEach(item => { dict[item.date] = item.count; });
            resolve(dict);
          };
          req.onerror = () => resolve({});
        } catch (e) { resolve({}); }
      });
    },

    async exportComprehensiveBackup() {
      const allProgress = await new Promise((resolve) => {
        if (isFallbackMode || !dbInstance) {
          resolve(Object.values(fallbackStorage.word_progress));
          return;
        }
        try {
          const tx = dbInstance.transaction('word_progress', 'readonly');
          const req = tx.objectStore('word_progress').getAll();
          req.onsuccess = () => resolve(req.result || []);
          req.onerror = () => resolve([]);
        } catch (e) { resolve([]); }
      });

      const gamification = await this.getGamification() || fallbackStorage.gamification;
      const settings = await this.getSettings() || fallbackStorage.settings;
      const history = await this.getWeeklyHistory();

      return {
        app: 'FarhangLex',
        version: '3.1.0',
        contentVersion: '3.1.0',
        exportDate: new Date().toISOString(),
        progressRecords: allProgress,
        gamification: gamification,
        settings: settings,
        weeklyHistory: history,
        history: history
      };
    },

    // F50 draft: all IndexedDB stores commit together. A failed request aborts the ENTIRE transaction.
    // `restoreToken` is recorded in the existing settings store; no IndexedDB schema/version is changed.
    async importComprehensiveBackup(backupData, opts = {}) {
      if (!backupData || typeof backupData !== 'object' || Array.isArray(backupData) ||
          (!Array.isArray(backupData.progressRecords) && (!backupData.allGradesProgress || typeof backupData.allGradesProgress !== 'object' || Array.isArray(backupData.allGradesProgress))) ||
          ('progressRecords' in backupData && !Array.isArray(backupData.progressRecords)) ||
          ('allGradesProgress' in backupData && (!backupData.allGradesProgress || typeof backupData.allGradesProgress !== 'object' || Array.isArray(backupData.allGradesProgress)))) {
        throw new Error('ساختار فایل پشتیبان نامعتبر است');
      }
      const records = [];
      if (Array.isArray(backupData.progressRecords)) {
        backupData.progressRecords.forEach(rec => {
          if (!rec || typeof rec !== 'object' || Array.isArray(rec) || typeof rec.wordId !== 'string' || !rec.wordId) throw new Error('پیشرفت واژه نامعتبر است');
          records.push(rec);
        });
      }
      if (backupData.allGradesProgress && typeof backupData.allGradesProgress === 'object') {
        Object.entries(backupData.allGradesProgress).forEach(([gradeId, dict]) => {
          if (gradeId.startsWith('custom_')) return;
          if (!dict || typeof dict !== 'object' || Array.isArray(dict)) throw new Error('پیشرفت پایه نامعتبر است');
          Object.entries(dict).forEach(([wordId, rec]) => {
            if (!wordId || !rec || typeof rec !== 'object' || Array.isArray(rec)) throw new Error('پیشرفت واژه نامعتبر است');
            records.push(Object.assign({ wordId, gradeId }, rec));
          });
        });
      }
      const histObj = backupData.weeklyHistory || backupData.history;
      const history = histObj && typeof histObj === 'object' ? Object.entries(histObj) : [];
      const game = backupData.gamification ? Object.assign({}, backupData.gamification, { id: 'main' }) : null;
      const settings = backupData.settings ? Object.assign({}, backupData.settings, { id: 'main' }) : null;
      if (isFallbackMode || !dbInstance) {
        const before = fallbackStorage;
        const next = Object.assign({}, before, { word_progress: Object.create(null), history: histObj ? {} : Object.assign({}, before.history) });
        records.forEach(rec => { next.word_progress[rec.wordId] = Object.assign({}, rec); });
        if (game) next.gamification = game;
        if (settings) next.settings = settings;
        history.forEach(([d, c]) => { next.history[d] = Number(c) || 0; });
        fallbackStorage = next;
        if (!opts.skipLocalWrites && !this._saveFallbackToLocalStorage()) {
          fallbackStorage = before;
          throw new Error('ذخیرهٔ بازیابی ممکن نشد');
        }
        return records.length;
      }
      return new Promise((resolve, reject) => {
        let tx, done = false;
        const fail = err => { if (!done) { done = true; reject(err || new Error('ذخیرهٔ بازیابی ممکن نشد')); } };
        try {
          tx = dbInstance.transaction(['word_progress', 'gamification', 'settings', 'history'], 'readwrite');
          tx.oncomplete = () => { if (!done) { done = true; resolve(records.length); } };
          tx.onabort = () => fail(tx.error || new Error('ذخیرهٔ بازیابی لغو شد'));
          tx.onerror = () => {}; // transaction abort handles asynchronous request failures
          const words = tx.objectStore('word_progress');
          words.clear();
          records.forEach(rec => words.put(rec));
          if (game) tx.objectStore('gamification').put(game);
          if (settings) tx.objectStore('settings').put(settings);
          if (histObj) tx.objectStore('history').clear();
          history.forEach(([d, c]) => tx.objectStore('history').put({ date: d, count: Number(c) || 0 }));
          if (opts.restoreToken) tx.objectStore('settings').put({ id: '__fl_restore_commit__', token: String(opts.restoreToken) });
        } catch (e) {
          if (tx) { try { tx.abort(); } catch (ignored) {} }
          fail(e);
        }
      });
    },

    isUsingFallback() { return isFallbackMode || !dbInstance; },

    async getRestoreCommitToken() {
      if (isFallbackMode || !dbInstance) return null;
      return new Promise((resolve, reject) => {
        try {
          const tx = dbInstance.transaction('settings', 'readonly');
          const req = tx.objectStore('settings').get('__fl_restore_commit__');
          req.onsuccess = () => resolve(req.result ? req.result.token : null);
          req.onerror = () => reject(req.error || new Error('خواندن نشان بازیابی ناموفق بود'));
          tx.onabort = () => reject(tx.error || new Error('خواندن نشان بازیابی لغو شد'));
        } catch (e) { reject(e); }
      });
    },

    // Journal the old/new local values before touching either store. The IDB commit token is
    // written IN the same transaction as the records, so recovery can unambiguously choose
    // rollback or roll-forward after the app/process stops between the two storage systems.
    async commitBackupSafely(backupData, changes) {
      if (restoreBusy) throw new Error('بازیابی دیگری در جریان است');
      restoreBusy = true;
      const beforeFallback = fallbackStorage;
      let journal = null, committed = false, journalWritten = false, valuesTouched = false;
      try {
        if (localStorage.getItem(RESTORE_JOURNAL) !== null) await this.recoverBackupJournal();
        if (!changes || typeof changes !== 'object' || Array.isArray(changes)) throw new Error('فهرست تغییرات بازیابی نامعتبر است');
        const before = {}, after = {};
        Object.keys(changes).forEach(key => {
          if (!restoreKeyOK(key) || !(changes[key] === null || typeof changes[key] === 'string')) throw new Error('شناسهٔ بازیابی نامعتبر است');
          before[key] = localStorage.getItem(key);
          after[key] = changes[key];
        });
        journal = { v: 1, token: String(Date.now()) + '_' + String(Math.random()).slice(2), mode: this.isUsingFallback() ? 'fallback' : 'idb', phase: 'prepared', before, after };
        const raw = JSON.stringify(journal);
        localStorage.setItem(RESTORE_JOURNAL, raw);
        journalWritten = true;
        if (localStorage.getItem(RESTORE_JOURNAL) !== raw) throw new Error('ثبت نسخهٔ ایمن بازیابی ناموفق بود');
        valuesTouched = true;
        applyRestoreValues(after);
        if (journal.mode === 'fallback') {
          await this.importComprehensiveBackup(backupData, { skipLocalWrites: true });
          journal.phase = 'committed';
          const finalRaw = JSON.stringify(journal);
          localStorage.setItem(RESTORE_JOURNAL, finalRaw);
          if (localStorage.getItem(RESTORE_JOURNAL) !== finalRaw) throw new Error('ثبت پایان بازیابی ناموفق بود');
        } else {
          await this.importComprehensiveBackup(backupData, { restoreToken: journal.token });
        }
        committed = true;
        removeRestoreJournal();
        return true;
      } catch (e) {
        if (!committed && journalWritten) {
          fallbackStorage = beforeFallback;
          try { if (valuesTouched) applyRestoreValues(journal.before); removeRestoreJournal(); }
          catch (rollbackError) { const x = new Error('بازیابی ناتمام است؛ برنامه را پس از آزادکردن فضا دوباره باز کنید'); x.recoveryNeeded = true; throw x; }
        } else if (committed) {
          const x = new Error('بازیابی ثبت شد، اما پاک‌سازی نشان آن ناموفق بود؛ برنامه را دوباره باز کنید'); x.recoveryNeeded = true; throw x;
        }
        throw e;
      } finally { restoreBusy = false; }
    },

    async recoverBackupJournal() {
      const raw = localStorage.getItem(RESTORE_JOURNAL);
      if (raw === null) return false;
      const j = JSON.parse(raw);
      if (!j || j.v !== 1 || typeof j.token !== 'string' || !j.token || !['idb', 'fallback'].includes(j.mode) || !['prepared', 'committed'].includes(j.phase) || !j.before || !j.after || typeof j.before !== 'object' || typeof j.after !== 'object' || Array.isArray(j.before) || Array.isArray(j.after)) throw new Error('نشان بازیابی ناتمام خوانا نیست');
      const beforeKeys = Object.keys(j.before).sort(), afterKeys = Object.keys(j.after).sort();
      if (JSON.stringify(beforeKeys) !== JSON.stringify(afterKeys) || beforeKeys.some(k => !restoreKeyOK(k))) throw new Error('نشان بازیابی ناتمام معتبر نیست');
      let committed;
      if (j.mode === 'idb') {
        if (this.isUsingFallback()) throw new Error('برای کامل‌کردن بازیابی به پایگاه اصلی نیاز است');
        committed = (await this.getRestoreCommitToken()) === j.token;
      } else {
        committed = j.phase === 'committed';
      }
      applyRestoreValues(committed ? j.after : j.before);
      if (this.isUsingFallback()) this._loadFallbackFromLocalStorage();
      removeRestoreJournal();
      return true;
    },

    _loadFallbackFromLocalStorage() {
      try {
        const g = localStorage.getItem('farhanglex_gamification_v30') || localStorage.getItem('farhanglex_gamification_v21');
        if (g) fallbackStorage.gamification = Object.assign({ id: 'main' }, JSON.parse(g));
        const s = localStorage.getItem('farhanglex_settings_v30') || localStorage.getItem('farhanglex_settings_v21');
        if (s) fallbackStorage.settings = Object.assign({ id: 'main' }, JSON.parse(s));
        const h = localStorage.getItem('farhanglex_weekly_history');
        if (h) fallbackStorage.history = JSON.parse(h);
      } catch (e) {}
    },

    _saveFallbackToLocalStorage() {
      try {
        localStorage.setItem('farhanglex_gamification_v30', JSON.stringify(fallbackStorage.gamification));
        localStorage.setItem('farhanglex_settings_v21', JSON.stringify(fallbackStorage.settings));
        localStorage.setItem('farhanglex_weekly_history', JSON.stringify(fallbackStorage.history));
        return true;
      } catch (e) { return false; }
    }
  };

  window.FarhangLexDB = FarhangLexDB;
})(typeof window !== 'undefined' ? window : global);
