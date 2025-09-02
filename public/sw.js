const CACHE_NAME = 'delivery-saas-v1'
const STATIC_CACHE = 'delivery-saas-static-v1'
const DYNAMIC_CACHE = 'delivery-saas-dynamic-v1'

// URLs para precache
const PRECACHE_URLS = [
  '/',
  '/menu',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
]

// Estratégia de cache para imagens
const IMAGE_CACHE_STRATEGY = 'cache-first'

// Instalação do Service Worker
self.addEventListener('install', event => {
  console.log('Service Worker instalando...')

  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then(cache => {
        console.log('Cache aberto')
        return cache.addAll(PRECACHE_URLS)
      })
      .then(() => {
        console.log('Recursos precacheados com sucesso')
        return self.skipWaiting()
      })
      .catch(error => {
        console.error('Erro ao fazer precache:', error)
      })
  )
})

// Ativação do Service Worker
self.addEventListener('activate', event => {
  console.log('Service Worker ativando...')

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Removendo cache antigo:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        console.log('Service Worker ativado')
        return self.clients.claim()
      })
  )
})

// Interceptação de requisições
self.addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)

  // Estratégia para páginas principais (Network First com fallback para cache)
  if (
    request.mode === 'navigate' ||
    (request.method === 'GET' &&
      request.headers.get('accept').includes('text/html'))
  ) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Clone a resposta antes de usar
          const responseClone = response.clone()

          // Armazena no cache dinâmico
          caches.open(DYNAMIC_CACHE).then(cache => {
            cache.put(request, responseClone)
          })

          return response
        })
        .catch(() => {
          // Fallback para cache
          return caches.match(request).then(response => {
            if (response) {
              return response
            }

            // Fallback offline para páginas públicas
            if (url.pathname === '/' || url.pathname === '/menu') {
              return caches.match('/offline.html').then(offlineResponse => {
                if (offlineResponse) {
                  return offlineResponse
                }

                // Resposta offline simples
                return new Response(
                  `
                      <!DOCTYPE html>
                      <html lang="pt-BR">
                        <head>
                          <meta charset="UTF-8">
                          <meta name="viewport" content="width=device-width, initial-scale=1.0">
                          <title>Offline - Delivery SaaS</title>
                          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
                          <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet">
                        </head>
                        <body>
                          <div class="container py-5 text-center">
                            <i class="fas fa-wifi-slash fa-5x text-muted mb-4"></i>
                            <h1>Você está offline</h1>
                            <p class="lead">Não foi possível carregar esta página. Verifique sua conexão com a internet.</p>
                            <button class="btn btn-primary" onclick="window.location.reload()">
                              <i class="fas fa-redo me-2"></i>
                              Tentar Novamente
                            </button>
                          </div>
                        </body>
                      </html>
                    `,
                  {
                    headers: { 'Content-Type': 'text/html' }
                  }
                )
              })
            }
          })
        })
    )
  }

  // Estratégia Cache First para imagens
  else if (
    request.destination === 'image' ||
    request.url.includes('/images/') ||
    request.url.includes('/api/placeholder/')
  ) {
    event.respondWith(
      caches.match(request).then(response => {
        if (response) {
          return response
        }

        return fetch(request)
          .then(response => {
            // Verifica se a resposta é válida
            if (
              !response ||
              response.status !== 200 ||
              response.type !== 'basic'
            ) {
              return response
            }

            // Clone a resposta para armazenar no cache
            const responseToCache = response.clone()

            caches.open(DYNAMIC_CACHE).then(cache => {
              cache.put(request, responseToCache)
            })

            return response
          })
          .catch(() => {
            // Fallback para imagem placeholder
            return caches.match('/icons/icon-192x192.png')
          })
      })
    )
  }

  // Estratégia para outros recursos estáticos (CSS, JS, etc.)
  else if (
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'font'
  ) {
    event.respondWith(
      caches.match(request).then(response => {
        if (response) {
          return response
        }

        return fetch(request).then(response => {
          if (!response || response.status !== 200) {
            return response
          }

          const responseToCache = response.clone()

          caches.open(DYNAMIC_CACHE).then(cache => {
            cache.put(request, responseToCache)
          })

          return response
        })
      })
    )
  }

  // Para outras requisições, usa Network First
  else {
    event.respondWith(
      fetch(request).catch(() => {
        return caches.match(request)
      })
    )
  }
})

// Sincronização em background
self.addEventListener('sync', event => {
  console.log('Background sync:', event.tag)

  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync())
  }
})

// Função para sincronização em background
function doBackgroundSync() {
  return new Promise(resolve => {
    console.log('Executando sincronização em background...')
    // Aqui você pode implementar a lógica de sincronização
    // Por exemplo, enviar pedidos offline para o servidor
    resolve()
  })
}

// Notificações push
self.addEventListener('push', event => {
  console.log('Push notification recebida:', event)

  const options = {
    body: event.data ? event.data.text() : 'Nova notificação do Delivery SaaS',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver Pedido',
        icon: '/icons/icon-72x72.png'
      },
      {
        action: 'close',
        title: 'Fechar',
        icon: '/icons/icon-72x72.png'
      }
    ]
  }

  event.waitUntil(self.registration.showNotification('Delivery SaaS', options))
})

// Clique em notificação
self.addEventListener('notificationclick', event => {
  console.log('Notificação clicada:', event)

  event.notification.close()

  if (event.action === 'explore') {
    event.waitUntil(clients.openWindow('/menu'))
  }
})
