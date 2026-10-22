const C="indicadores-v14",A=["./","./index.html","./manifest.webmanifest","./lib/jspdf.umd.min.js","./lib/xlsx.full.min.js","./icons/icon-192.png","./icons/icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>Promise.allSettled(A.map(u=>c.add(u)))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET"||new URL(r.url).origin!==location.origin)return;
e.respondWith(caches.match(r).then(m=>{const n=fetch(r).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res}).catch(()=>m||(r.mode==="navigate"?caches.match("./index.html").then(x=>x||caches.match("./")):null)).then(x=>x||new Response("Sin conexión",{status:503,statusText:"Offline"}));return m||n}))});
