(()=>{"use strict";function e(e){const t=localStorage.getItem(e);return t?JSON.parse(t):[]}function t(e){chrome.tabs.query({active:!0,currentWindow:!0},(t=>{if(t&&t[0]&&t[0].url){const n=new URL(t[0].url);e(n)}}))}function n(){const n=document.getElementById("addCoordInput"),c=n.value;t((t=>{const n=t.hash.replace(/#\w+,/i,"");!function(t,n){const o=e("coords");o.push(n),localStorage.setItem("coords",JSON.stringify(o))}(0,{[c||n]:n}),o()})),n.value=""}function o(){const n=document.getElementById("coordsList"),o=e("coords");t((e=>{const t=e.hash,c=e.href,d=t.replace(/,(\d+,\d+)/,"");n.innerHTML="",o.forEach((e=>{const o=Object.keys(e)[0],r=`${d},${e[o]}`,a=c.replace(t,r),l=document.createElement("li"),u=document.createElement("a");u.innerText=o,u.href=a,u.addEventListener("click",(e=>{e.preventDefault(),chrome.tabs.update({url:a})})),l.appendChild(u),null==n||n.appendChild(l)}))}))}o();const c=document.getElementById("addCoordButton"),d=document.getElementById("addCoordInput");null==c||c.addEventListener("click",n),d.addEventListener("keydown",(e=>{"Enter"===e.key&&(e.preventDefault(),n())}))})();