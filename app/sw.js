/* 공수뚝딱 서비스워커 — 현장은 신호가 약하다. 인터넷이 없어도 앱이 열려야 한다.
   ★ 저장된 공수 기록은 여기서 다루지 않는다(localStorage 담당). 이건 앱 파일만 캐시한다.
   빌드할 때마다 build-pwa.js 가 202609150045 를 새 값으로 바꿔 캐시를 갈아끼운다. */
var CACHE='gongsu-202609150045';
var SHELL=[
  './','./index.html','./manifest.json',
  './gongsu-icon-192.png','./gongsu-icon-512.png','./gongsu-icon.svg'
];

self.addEventListener('install',function(e){
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function(c){
    // 하나라도 실패하면 설치 전체가 엎어지므로 개별로 담는다
    return Promise.all(SHELL.map(function(u){
      return c.add(u).catch(function(){});
    }));
  }));
});

self.addEventListener('activate',function(e){
  e.waitUntil(
    caches.keys().then(function(ks){
      return Promise.all(ks.map(function(k){
        return k===CACHE?null:caches.delete(k);
      }));
    }).then(function(){return self.clients.claim();})
  );
});

self.addEventListener('fetch',function(e){
  var req=e.request;
  if(req.method!=='GET')return;
  var url=new URL(req.url);
  if(url.origin!==location.origin)return;          // 외부(CDN 등)는 건드리지 않는다

  /* 화면(HTML)은 네트워크 우선 — 안 그러면 옛 버전에 갇힌다.
     실패하면 캐시로 떨어져서 오프라인에서도 열린다. */
  if(req.mode==='navigate'||(req.headers.get('accept')||'').indexOf('text/html')>-1){
    e.respondWith(
      fetch(req).then(function(res){
        var copy=res.clone();
        caches.open(CACHE).then(function(c){c.put('./index.html',copy);}).catch(function(){});
        return res;
      }).catch(function(){
        return caches.match('./index.html').then(function(r){return r||caches.match('./');});
      })
    );
    return;
  }

  /* 나머지(아이콘·라이브러리)는 캐시 우선 — 빠르고, 오프라인에서도 뜬다 */
  e.respondWith(
    caches.match(req).then(function(hit){
      return hit||fetch(req).then(function(res){
        if(res&&res.status===200&&res.type==='basic'){
          var copy=res.clone();
          caches.open(CACHE).then(function(c){c.put(req,copy);}).catch(function(){});
        }
        return res;
      });
    })
  );
});
