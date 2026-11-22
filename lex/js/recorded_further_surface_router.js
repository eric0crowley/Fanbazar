/* Locked offline resolver for exact tappable Further surfaces.
 * v42 adds exactly one audited contextual heteronym correction: present
 * read /riːd/ versus past read /red/. It never falls back across accents,
 * never guesses for changed/ambiguous text, and never uses TTS or network.
 */
(function(root,factory){
  'use strict';const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.FlxRecordedFurtherSurfaceRouter=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const norm=x=>String(x||'').trim().toLowerCase().replace(/’/g,"'");
  function allowed(index,item,text){
    if(!index||!index.items||!item||typeof item.id!=='string'||!Array.isArray(item.paragraphs))return null;
    const row=index.items[item.id];
    if(!row||!Array.isArray(row.paragraphs)||!Array.isArray(row.surfaces)||row.paragraphs.length!==item.paragraphs.length)return null;
    if(item.paragraphs.some((p,i)=>!p||typeof p.text!=='string'||p.text!==row.paragraphs[i]))return null;
    const key=norm(text);if(!key)return null;
    const hit=row.surfaces.filter(x=>x&&x.key===key);
    return hit.length===1?{key}:null;
  }
  function clip(catalogue,accent,key){
    const a=accent==='en-US'?'us':accent==='en-GB'?'uk':null;
    const x=a&&catalogue&&catalogue.tokenBank&&catalogue.tokenBank[key]&&catalogue.tokenBank[key][a];
    if(!x||typeof x.file!=='string'||!/^tokens\/(?:us|uk)\/[0-9]{3,5}\.mp3$/.test(x.file)||
       !x.file.startsWith('tokens/'+a+'/')||!Number.isFinite(x.duration)||x.duration<=0)return null;
    return {src:'audio/'+x.file,duration:x.duration};
  }
  function contextualKey(item,key){
    if(item.id!=='vision_3_l1_listening1'||key!=='read')return key;
    const texts=item.paragraphs.map(p=>p.text),count=texts.reduce((n,t)=>n+(t.match(/\bread\b/gi)||[]).length,0);
    // A text-level resolver cannot disambiguate two same-spelling tokens in one
    // paragraph. Refuse rather than silently selecting a wrong tense.
    if(count!==1||texts.filter(t=>t.includes('story I read recently.')).length!==1)return null;
    return 'red'; // audited same-accent /red/ source for the explicit past use
  }
  function describe(index,catalogue,item,accent,text){
    const valid=allowed(index,item,text);if(!valid)return null;
    const key=contextualKey(item,valid.key),c=key===null?null:clip(catalogue,accent,key);
    return {key:valid.key,available:!!c,clip:c};
  }
  function resolve(index,catalogue,item,accent,text){const d=describe(index,catalogue,item,accent,text);return d&&d.clip||null;}
  return Object.freeze({describe,resolve});
});
