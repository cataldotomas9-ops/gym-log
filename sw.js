const V='gymlog-v3';
const CORE=['./','index.html','manifest.webmanifest','icon-180.png','icon-512.png'];
const IMGS=["i-Barbell_Hip_Thrust-0.jpg","i-Barbell_Hip_Thrust-1.jpg","i-Calf_Press_On_The_Leg_Press_Machine-0.jpg","i-Calf_Press_On_The_Leg_Press_Machine-1.jpg","i-Crunches-0.jpg","i-Crunches-1.jpg","i-Dumbbell_Bench_Press-0.jpg","i-Dumbbell_Bench_Press-1.jpg","i-Hyperextensions_Back_Extensions-0.jpg","i-Hyperextensions_Back_Extensions-1.jpg","i-Knee_Hip_Raise_On_Parallel_Bars-0.jpg","i-Knee_Hip_Raise_On_Parallel_Bars-1.jpg","i-Leg_Extensions-0.jpg","i-Leg_Extensions-1.jpg","i-Leg_Press-0.jpg","i-Leg_Press-1.jpg","i-Leverage_Chest_Press-0.jpg","i-Leverage_Chest_Press-1.jpg","i-Lying_Leg_Curls-0.jpg","i-Lying_Leg_Curls-1.jpg","i-Preacher_Curl-0.jpg","i-Preacher_Curl-1.jpg","i-Reverse_Machine_Flyes-0.jpg","i-Reverse_Machine_Flyes-1.jpg","i-Seated_Cable_Rows-0.jpg","i-Seated_Cable_Rows-1.jpg","i-Seated_Leg_Curl-0.jpg","i-Seated_Leg_Curl-1.jpg","i-Side_Lateral_Raise-0.jpg","i-Side_Lateral_Raise-1.jpg","i-Thigh_Adductor-0.jpg","i-Thigh_Adductor-1.jpg","i-Triceps_Pushdown_-_V-Bar_Attachment-0.jpg","i-Triceps_Pushdown_-_V-Bar_Attachment-1.jpg","i-Wide-Grip_Lat_Pulldown-0.jpg","i-Wide-Grip_Lat_Pulldown-1.jpg"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE).then(()=>Promise.all(IMGS.map(u=>c.add(u).catch(()=>{}))))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>{
    const net=fetch(e.request).then(r=>{if(r&&(r.ok||r.type==='opaque')){const cp=r.clone();caches.open(V).then(c=>c.put(e.request,cp));}return r}).catch(()=>hit);
    return hit||net;
  }));
});
