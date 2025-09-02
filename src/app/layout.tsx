import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration'
import CartWidget from '@/components/CartWidget'
import CartProvider from '@/components/CartProvider'
import CartNotification from '@/components/CartNotification'
import { AuthProvider } from '@/components/AuthProvider'
import ErrorBoundary from '@/components/ErrorBoundary'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Delivery SaaS',
  description: 'Sistema de delivery desenvolvido em Next.js + Firebase',
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ErrorBoundary>
          <AuthProvider>
            <CartProvider>
              <div className="d-flex flex-column min-vh-100">
                <Navbar />
                <main className="flex-grow-1">
                  {children}
                </main>
                <Footer />
              </div>
              <CartWidget />
              <CartNotification />
            </CartProvider>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
            <ServiceWorkerRegistration />
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
