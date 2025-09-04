// Import Firebase scripts
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js')
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js'
)

// Initialize Firebase in the service worker
// Note: In production, these values should be replaced with actual Firebase config
firebase.initializeApp({
  apiKey: 'AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  authDomain: 'delivery-saas-7055a.firebaseapp.com',
  projectId: 'delivery-saas-7055a',
  storageBucket: 'delivery-saas-7055a.appspot.com',
  messagingSenderId: '123456789',
  appId: '1:123456789:web:abcdef123456'
})

// Retrieve an instance of Firebase Messaging so that it can handle background messages
const messaging = firebase.messaging()

// Handle background messages
messaging.onBackgroundMessage(function (payload) {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  )

  const notificationTitle = payload.notification.title || 'Nova notificação'
  const notificationOptions = {
    body: payload.notification.body || 'Você tem uma nova notificação',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-192x192.png',
    tag: 'delivery-notification',
    requireInteraction: true,
    actions: [
      {
        action: 'open',
        title: 'Abrir'
      },
      {
        action: 'close',
        title: 'Fechar'
      }
    ]
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})

// Handle notification clicks
self.addEventListener('notificationclick', function (event) {
  console.log('[firebase-messaging-sw.js] Notification click received.')

  event.notification.close()

  if (event.action === 'open' || !event.action) {
    // Open the app
    event.waitUntil(clients.openWindow('/admin'))
  }
})
