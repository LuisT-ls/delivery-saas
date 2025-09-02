'use client'

import { useEffect } from 'react'

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      // Aguardar a página carregar completamente
      window.addEventListener('load', function () {
        // Verificar se já existe um service worker registrado
        navigator.serviceWorker.getRegistrations().then(registrations => {
          // Remover registros antigos se existirem
          registrations.forEach(registration => {
            registration.unregister()
          })

          // Registrar o novo service worker
          navigator.serviceWorker.register('/sw.js', {
            scope: '/'
          })
            .then(function (registration) {
              console.log('Service Worker registrado com sucesso:', registration);

              // Verificar se há atualizações
              registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                if (newWorker) {
                  newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                      // Nova versão disponível
                      console.log('Nova versão do Service Worker disponível');
                    }
                  });
                }
              });
            })
            .catch(function (registrationError) {
              console.error('Falha no registro do Service Worker:', registrationError);
            });
        });
      });
    }
  }, [])

  return null
}
