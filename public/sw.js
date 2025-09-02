const CACHE_NAME = 'delivery-saas-v1'
const STATIC_CACHE = 'delivery-saas-static-v1'
const DYNAMIC_CACHE = 'delivery-saas-dynamic-v1'

// URLs para precache
const PRECACHE_URLS = ['/', '/menu', '/manifest.json']

// Estratégia de cache para imagens
const IMAGE_CACHE_STRATEGY = 'cache-first'

// Função para verificar se a URL é válida para cache
function isValidUrlForCache(url) {
  // Não fazer cache de URLs com esquemas não suportados
  if (
    url.protocol === 'chrome-extension:' ||
    url.protocol === 'chrome:' ||
    url.protocol === 'moz-extension:' ||
    url.protocol === 'edge:' ||
    url.protocol === 'safari-extension:'
  ) {
    return false
  }

  // Não fazer cache de URLs de extensões
  if (
    url.hostname.includes('chrome-extension') ||
    url.hostname.includes('moz-extension') ||
    url.hostname.includes('safari-extension')
  ) {
    return false
  }

  return true
}

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

  // Verificar se a URL é válida para cache
  if (!isValidUrlForCache(url)) {
    // Para URLs não suportadas, apenas fazer fetch sem cache
    event.respondWith(fetch(request))
    return
  }

  // Estratégia para páginas principais (Network First com fallback para cache)
  if (
    request.mode === 'navigate' ||
    (request.method === 'GET' &&
      request.headers.get('accept')?.includes('text/html'))
  ) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Clone a resposta antes de usar
          const responseClone = response.clone()

          // Armazena no cache dinâmico apenas se for uma resposta válida
          if (response.status === 200) {
            caches.open(DYNAMIC_CACHE).then(cache => {
              cache.put(request, responseClone).catch(error => {
                console.warn('Erro ao armazenar no cache:', error)
              })
            })
          }

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
              cache.put(request, responseToCache).catch(error => {
                console.warn('Erro ao armazenar imagem no cache:', error)
              })
            })

            return response
          })
          .catch(() => {
            // Fallback para imagem placeholder
            return caches.match('/icons/icon.svg')
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
            cache.put(request, responseToCache).catch(error => {
              console.warn('Erro ao armazenar recurso no cache:', error)
            })
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
    icon: '/icons/icon.svg',
    badge: '/icons/icon.svg',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver Pedido',
        icon: '/icons/icon.svg'
      },
      {
        action: 'close',
        title: 'Fechar',
        icon: '/icons/icon.svg'
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
