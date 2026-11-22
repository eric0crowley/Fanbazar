/* Candidate-only offline speech facade. NOT linked to the production app.
 * Provides exact-ID global vocabulary, sentence and token routing over the
 * draft router/player. No Android TTS, Web Speech, remote URL or accent fallback.
 * The real app must wire UI events, Further playback, lifecycle and device QA.
 */
(function(root,factory){
  'use strict';
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.FlxRecordedAudioFacade=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const norm=x=>String(x||'').trim().toLowerCase().replace(/’/g,"'");
  function create({catalogue,tokenPlan,router,player,getAccent,getRate}){
    if(!catalogue||!catalogue.sentences||!catalogue.globalWords||!router||!player||
       typeof player.play!=='function'||typeof getAccent!=='function')throw new TypeError('offline facade dependencies missing');
    const byId=new Map();
    for(const [key,items] of Object.entries(catalogue.globalWords)){
      if(!Array.isArray(items))throw new TypeError('invalid global word index');
      for(const x of items){
        if(!x||!x.id||x.source!=='packaged'||norm(x.word)!==key||byId.has(x.id))throw new TypeError('ambiguous/non-packaged word index');
        byId.set(x.id,Object.freeze({...x}));
      }
    }
    const tokenRecords=new Map();
    if(tokenPlan){
      if(!Array.isArray(tokenPlan.records))throw new TypeError('invalid token plan');
      for(const row of tokenPlan.records){
        if(!row||!row.id||tokenRecords.has(row.id)||!Array.isArray(row.tokens))throw new TypeError('ambiguous token record');
        const fixed=catalogue.sentences[row.id];
        const actual=fixed&&String(fixed.text).match(/[a-zA-Z]+(?:['’][a-zA-Z]+)?/g)||[];
        if(!fixed||actual.length!==row.tokens.length||row.tokens.some((t,i)=>!t||t.index!==i||norm(t.text)!==norm(actual[i])))
          throw new TypeError('token plan is stale for sentence '+row.id);
        tokenRecords.set(row.id,row);
      }
    }
    function accent(){try{return getAccent();}catch(e){return null;}}
    function rate(requested){
      if(requested!==undefined&&requested!==null)return requested;
      try{return typeof getRate==='function'?getRate():1;}catch(e){return NaN;}
    }
    function queue(clip,requested){return player.play(clip,{rate:rate(requested)});}
    function validRuntime(rec){return !!rec&&!!rec.id&&rec.source!=='user';}
    function findWord(rec){
      if(!validRuntime(rec))return null;
      const packaged=byId.get(rec.id);
      if(!packaged||norm(packaged.word)!==norm(rec.word))return null;
      return packaged;
    }
    function playWord(rec,requested){
      const entry=findWord(rec),clip=entry&&router.word(entry,accent());
      return queue(clip,requested);
    }
    function playSentence(rec,requested){
      const clip=validRuntime(rec)&&router.sentence(catalogue,rec,accent());
      return queue(clip||null,requested);
    }
    function tapSentenceToken(rec,index,text,requested){
      const selectedAccent=accent();
      const line=validRuntime(rec)&&router.sentence(catalogue,rec,selectedAccent);
      const plan=line&&tokenRecords.get(rec.id);
      if(!plan||!Number.isSafeInteger(index)||index<0){queue(null,requested);return {action:'UNAVAILABLE'};}
      const matches=plan.tokens.filter(t=>t.index===index);
      if(matches.length!==1||norm(matches[0].text)!==norm(text)){queue(null,requested);return {action:'UNAVAILABLE'};}
      const t=matches[0];
      // Existing UX opens a modal for target words; it must not fake a token clip.
      if(t.route==='TARGET_MODAL'){
        if(!findWord(rec)){queue(null,requested);return {action:'UNAVAILABLE'};}
        stop();
        return {action:'OPEN_MODAL',wordId:rec.id};
      }
      let clip=null;
      if(t.route==='EXISTING_WORD'||t.route==='EXISTING_GLOBAL_WORD'){
        const expected=byId.get(t.id);const expectedClip=expected&&router.word(expected,selectedAccent);
        const resolved=t.route==='EXISTING_WORD'
          ?router.sentenceGradeWord(catalogue,rec,selectedAccent,index,text)
          :router.sentenceGlobalWord(catalogue,rec,selectedAccent,index,text);
        // Exact id/route check prevents accidentally selecting a homograph or
        // a different grade when the plan/catalogue are inconsistent.
        if(expectedClip&&resolved&&resolved.wordId===t.id&&expectedClip.src===resolved.src)clip=resolved;
      }else if(t.route==='TOKEN_BANK'){
        clip=router.sentenceBankToken(catalogue,rec,selectedAccent,index,text);
      }
      const accepted=queue(clip,requested);
      return {action:clip&&accepted?'PLAY_QUEUED':'UNAVAILABLE'};
    }
    // Preserve the dictionary modal/headword button, but enable a separate
    // exact-surface pronunciation when the clicked inflection differs.
    function lookupTargetSurface(rec,index,text){
      const a=accent();
      if(!validRuntime(rec)||!findWord(rec)||!router.sentence(catalogue,rec,a)||!Number.isSafeInteger(index)||index<0)return null;
      const row=tokenRecords.get(rec.id),token=row&&row.tokens[index];
      if(!token||token.index!==index||token.route!=='TARGET_MODAL'||norm(token.text)!==norm(text)||norm(token.text)===norm(rec.word))return null;
      return {text:token.text,clip:router.sentenceBankToken(catalogue,rec,a,index,text)};
    }
    function describeTargetSurface(rec,index,text){
      const found=lookupTargetSurface(rec,index,text);
      return found?{text:found.text,available:!!found.clip}:null;
    }
    function playTargetSurface(rec,index,text,requested){
      const found=lookupTargetSurface(rec,index,text);
      return queue(found&&found.clip,requested);
    }
    function resolveFurther(id){return router.further(catalogue,id,accent());}
    function stop(){if(typeof player.stop==='function')player.stop();}
    return Object.freeze({playWord,playSentence,tapSentenceToken,describeTargetSurface,playTargetSurface,resolveFurther,stop});
  }
  return Object.freeze({create});
});
