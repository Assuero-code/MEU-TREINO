const CACHE_NAME = 'treino-v1';

// Lista de arquivos que serão salvos para funcionar offline
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Instalação: Salva os arquivos no cache do navegador
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Cache aberto: salvando arquivos estáticos');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Ativação: Limpa caches antigos se você atualizar o app
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Busca (Fetch): Quando o app pede um arquivo, tenta o cache primeiro
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Se estiver no cache, retorna. Se não, tenta buscar na rede.
      return response || fetch(event.request);
    })
  );
});
