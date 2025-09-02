import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '../globals.css'
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Menu do Restaurante - Delivery SaaS',
  description: 'Cardápio digital do restaurante',
}

export default function RestaurantLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="d-flex flex-column min-vh-100">
          <main className="flex-grow-1">
            {children}
          </main>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
        <ServiceWorkerRegistration />
      </body>
    </html>
  )
}
