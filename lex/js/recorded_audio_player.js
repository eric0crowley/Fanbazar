/* Draft recorded-audio player for future FarhangLex; NOT connected to app.
 * Local MP3 only, no TTS/Web Speech or alternate-accent fallback. All word
 * clicks should prefer independent clips; bounded sentence snippets are not
 * implemented here because ordinary timeupdate cannot guarantee precise cuts.
 */
(function(root,factory){
  'use strict';
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.FlxRecordedAudioPlayer=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  function safeLocal(src){
    return typeof src==='string' && /^audio\/(?:[A-Za-z0-9_-]+\/)*[A-Za-z0-9_-]+\.mp3$/.test(src) &&
      !src.split('/').some(x=>x==='.'||x==='..');
  }
  function createPlayer({audioFactory,stopOthers,notify,haptic}){
    if(typeof audioFactory!=='function')throw new TypeError('audioFactory required');
    const tell=typeof notify==='function'?notify:()=>{};
    const vibrate=typeof haptic==='function'?haptic:()=>{};
    let current=null,generation=0;
    function dispose(audio){
      try{audio.pause();}catch(e){}
      try{audio.currentTime=0;}catch(e){}
    }
    function stop(){
      generation++;
      const prev=current;current=null;
      if(prev)dispose(prev.audio);
    }
    function play(clip,opts={}){
      // A new request stops old playback even when the requested clip is absent.
      stop();
      if(typeof stopOthers==='function'){
        try{stopOthers();}catch(e){tell('🔇 صوت قبلی متوقف نشد');return false;}
      }
      // Reject ranges until a separately tested exact-end implementation exists.
      if(!clip||!safeLocal(clip.src)||clip.start!==undefined||clip.end!==undefined){
        tell('🔇 صوت ضبط‌شده در دسترس نیست');return false;
      }
      const rate=opts.rate===undefined?1:opts.rate;
      if(!Number.isFinite(rate)||rate<.5||rate>2){tell('🔇 سرعت پخش معتبر نیست');return false;}
      let audio;
      try{audio=audioFactory(clip.src);if(!audio||typeof audio.play!=='function')throw Error('invalid audio element');}
      catch(e){tell('🔇 صوت ضبط‌شده پخش نشد');return false;}
      const id=generation;let failed=false;
      current={audio,id,src:clip.src};
      const isCurrent=()=>!!current&&current.id===id&&current.audio===audio;
      const fail=()=>{
        if(failed||!isCurrent())return;
        failed=true;current=null;dispose(audio);tell('🔇 صوت ضبط‌شده پخش نشد');
      };
      const ended=()=>{if(isCurrent())current=null;};
      try{
        if(typeof audio.addEventListener==='function'){
          audio.addEventListener('error',fail,{once:true});audio.addEventListener('ended',ended,{once:true});
        } else {audio.onerror=fail;audio.onended=ended;}
        audio.playbackRate=rate;
        const promise=audio.play();
        if(promise&&typeof promise.then==='function'){
          Promise.resolve(promise).then(()=>{if(isCurrent()&&!failed)vibrate();},fail);
        } else if(isCurrent())vibrate();
        return true; // queued/accepted, never proof that a person heard audio
      }catch(e){fail();return false;}
    }
    return Object.freeze({play,stop,onBackground:stop,isPlaying:()=>!!current,
      currentSource:()=>current?current.src:null});
  }
  return Object.freeze({safeLocal,createPlayer});
});
