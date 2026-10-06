// Service worker do Controle de Processos SEJUSP/FUNSEP.
// Existe para o navegador permitir instalar o sistema como programa.
// Nao guarda copia das telas nem dos dados: tudo vem sempre da internet,
// para a equipe nunca trabalhar com uma versao antiga do sistema.
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });

self.addEventListener('fetch', function (e) {
  if (e.request.mode !== 'navigate') return; // dados e arquivos seguem direto
  e.respondWith(
    fetch(e.request).catch(function () {
      return new Response(
        '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
        '<title>Sem conexão</title><body style="font-family:Arial,sans-serif;background:#f4f4f4;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0">' +
        '<div style="background:#fff;border-radius:12px;padding:28px 32px;max-width:380px;text-align:center;box-shadow:0 2px 12px rgba(0,0,0,.08)">' +
        '<h2 style="color:#1a3a5c;margin:0 0 10px">Sem conexão com a internet</h2>' +
        '<p style="color:#555;font-size:14px;line-height:1.5">O Controle de Processos precisa de internet para funcionar. Verifique a conexão e tente de novo.</p>' +
        '<button onclick="location.reload()" style="margin-top:14px;background:#1a3a5c;color:#fff;border:none;border-radius:8px;padding:10px 18px;font-size:14px;cursor:pointer">Tentar novamente</button>' +
        '</div></body>',
        { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
      );
    })
  );
});
