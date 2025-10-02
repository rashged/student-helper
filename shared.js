
// Shared helpers
export const $=s=>document.querySelector(s);
export const $$=s=>[...document.querySelectorAll(s)];
export const getKey = ns => (localStorage.getItem(ns+':key')||'').trim();
export const setKey = (ns,k)=>localStorage.setItem(ns+':key',k.trim());
export const b64e = obj => btoa(unescape(encodeURIComponent(JSON.stringify(obj))));
export const b64d = txt => { try{ return JSON.parse(decodeURIComponent(escape(atob(txt.trim())))); }catch{return null;} };
export async function ai(ns, prompt, system="أنت مساعد عربي مختصر ومفيد."){
  const key=getKey(ns); if(!key) throw new Error("ضع OpenAI API Key في الإعدادات");
  const r=await fetch("https://api.openai.com/v1/chat/completions",{
    method:"POST",
    headers:{"Content-Type":"application/json","Authorization":"Bearer "+key},
    body:JSON.stringify({model:"gpt-4o-mini",messages:[{role:"system",content:system},{role:"user",content:prompt}],temperature:0.6})
  });
  if(!r.ok){ throw new Error("OpenAI: "+await r.text()); }
  const j=await r.json(); return j.choices?.[0]?.message?.content?.trim()||"";
}
