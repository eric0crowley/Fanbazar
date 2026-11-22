/* Draft pure resolver for a future fully recorded FarhangLex release.
 * It does not play audio and contains no TTS fallback. The production app is
 * NOT wired to this draft until the complete catalogue and device tests exist.
 */
(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.FlxRecordedAudioRouter = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const filePattern = /^[A-Za-z0-9_/-]+\.mp3$/;
  function safeFile(file) {
    if (typeof file !== 'string' || !filePattern.test(file) || file.startsWith('/') ||
        file.split('/').some(p => !p || p === '.' || p === '..')) return null;
    return `audio/${file}`;
  }
  function accentKey(accent) {
    return accent === 'en-US' ? 'us' : (accent === 'en-GB' ? 'uk' : null);
  }
  function validDuration(value) { return Number.isFinite(value) && value > 0; }
  function normaliseWord(w) { return String(w || '').trim().toLowerCase().replace(/’/g, "'"); }
  function clip(value) {
    if (!value || !safeFile(value.file) || !validDuration(value.duration)) return null;
    return {src:safeFile(value.file), duration:value.duration};
  }
  function word(record, accent) {
    const key=accentKey(accent);
    if (!key || !record) return null;
    const src=safeFile(key==='uk' ? record.audioFileUk : record.audioFile);
    return src ? {src} : null;
  }
  function sentence(catalogue, record, accent) {
    const key=accentKey(accent);
    if (!key || !record || !record.id || !catalogue || !catalogue.sentences) return null;
    const row=catalogue.sentences[record.id];
    // Content-address safety: changed/custom example must never play stale speech.
    if (!row || row.text !== record.example) return null;
    return clip(row[key]);
  }
  function sentenceToken(catalogue, record, accent, clickedIndex, clickedText) {
    const c=sentence(catalogue,record,accent), key=accentKey(accent);
    if (!c || !Number.isSafeInteger(clickedIndex) || clickedIndex < 0 || !clickedText) return null;
    const row=catalogue.sentences[record.id][key];
    if (!Array.isArray(row.tokens)) return null;
    const matches=row.tokens.filter(t=>t.clickIndex===clickedIndex);
    if (matches.length!==1) return null;
    const t=matches[0];
    if (normaliseWord(t.text)!==normaliseWord(clickedText) || !Number.isFinite(t.start) ||
        !Number.isFinite(t.end) || t.start<0 || t.end<=t.start || t.end>c.duration) return null;
    return {...c, start:t.start, end:t.end};
  }
  function sentenceBankToken(catalogue, record, accent, clickedIndex, clickedText) {
    // Prefer a separately recorded isolated pronunciation when supplied. A
    // normalized token alone is not enough: validate the fixed sentence, ID,
    // actual UI token index and spelling to prevent stale/custom misrouting.
    if (!sentence(catalogue,record,accent) || !Number.isSafeInteger(clickedIndex) ||
        clickedIndex<0 || !clickedText) return null;
    const tokens=String(record.example).match(/[a-zA-Z]+(?:['’][a-zA-Z]+)?/g)||[];
    const shown=tokens[clickedIndex], token=normaliseWord(clickedText);
    if (!shown || normaliseWord(shown)!==token) return null;
    const key=accentKey(accent);
    const entry=catalogue.tokenBank && catalogue.tokenBank[token];
    return entry && key ? clip(entry[key]) : null;
  }
  function sentenceGradeWord(catalogue, record, accent, clickedIndex, clickedText) {
    // Resolve against the grade recorded in the immutable sentence catalogue,
    // never a user-supplied grade or a custom item with a lookalike spelling.
    if (!sentence(catalogue,record,accent) || !Number.isSafeInteger(clickedIndex) ||
        clickedIndex<0 || !clickedText) return null;
    const row=catalogue.sentences[record.id], grade=row && row.grade;
    const tokens=String(record.example).match(/[a-zA-Z]+(?:['’][a-zA-Z]+)?/g)||[];
    const key=normaliseWord(clickedText);
    if (!grade || !tokens[clickedIndex] || normaliseWord(tokens[clickedIndex])!==key) return null;
    const entries=catalogue.globalWords&&catalogue.globalWords[key];
    if (!Array.isArray(entries)) return null;
    const sameGrade=entries.filter(x=>x && x.grade===grade && x.source!=='user' &&
      x.id && normaliseWord(x.word)===key);
    if (sameGrade.length!==1) return null;
    const resolved=word(sameGrade[0],accent);
    return resolved ? {...resolved,wordId:sameGrade[0].id} : null;
  }
  function sentenceGlobalWord(catalogue, record, accent, clickedIndex, clickedText) {
    // A separate, immutable packaged-global index is required: never choose
    // user-created entries or guess among duplicate IDs. Some homographs have
    // stress that changes by grammatical role, so they must not be reused here.
    if (!sentence(catalogue,record,accent) || !Number.isSafeInteger(clickedIndex) ||
        clickedIndex<0 || !clickedText) return null;
    const tokens=String(record.example).match(/[a-zA-Z]+(?:['’][a-zA-Z]+)?/g)||[];
    const key=normaliseWord(clickedText);
    if (!tokens[clickedIndex] || normaliseWord(tokens[clickedIndex])!==key || key==='increase') return null;
    const entries=catalogue.globalWords&&catalogue.globalWords[key];
    if (!Array.isArray(entries)||entries.length!==1) return null;
    const entry=entries[0];
    if (!entry||!entry.id||entry.source==='user'||normaliseWord(entry.word)!==key) return null;
    const resolved=word(entry,accent);
    return resolved ? {...resolved,wordId:entry.id} : null;
  }
  function further(catalogue, id, accent) {
    const key=accentKey(accent);
    if (!key || !id || !catalogue || !catalogue.further || !catalogue.further[id]) return null;
    const row=catalogue.further[id][key], c=clip(row);
    if (!c) return null;
    if (row.turns !== undefined) {
      if (!Array.isArray(row.turns) || row.turns.some((x,i)=>!Number.isFinite(x) || x<0 ||
          x>=c.duration || (i>0 && x<=row.turns[i-1]))) return null;
      return {...c,turns:row.turns.slice()};
    }
    return c;
  }
  return Object.freeze({word,sentence,sentenceToken,sentenceBankToken,sentenceGradeWord,sentenceGlobalWord,further});
});
