'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useAuthContext } from '@/components/AuthProvider'

export default function Navbar() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true)
  const { user, logout, isAuthenticated } = useAuthContext()

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed)

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Erro no logout:', error)
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link href="/" className="navbar-brand">
          <i className="fas fa-utensils me-2"></i>
          Delivery SaaS
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link href="/" className="nav-link text-light">
                <i className="fas fa-home me-1"></i>
                Início
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/menu" className="nav-link text-light">
                <i className="fas fa-list me-1"></i>
                Cardápio
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/restaurantes" className="nav-link text-light">
                <i className="fas fa-store me-1"></i>
                Restaurantes
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/sobre" className="nav-link text-light">
                <i className="fas fa-info-circle me-1"></i>
                Sobre
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav">
            {isAuthenticated ? (
              <>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle text-light" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fas fa-user me-1"></i>
                    {user?.displayName || user?.email || 'Usuário'}
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <span className="dropdown-item-text">
                        <small className="text-muted">
                          {user?.isAnonymous ? 'Usuário Anônimo' : 'Usuário Logado'}
                        </small>
                      </span>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <Link href="/onboarding" className="dropdown-item">
                        <i className="fas fa-store me-2"></i>
                        Meu Restaurante
                      </Link>
                    </li>
                    <li>
                      <Link href="/admin" className="dropdown-item">
                        <i className="fas fa-cog me-2"></i>
                        Painel Admin
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        <i className="fas fa-sign-out-alt me-2"></i>
                        Sair
                      </button>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link href="/carrinho" className="nav-link text-light">
                    <i className="fas fa-shopping-cart me-1"></i>
                    Carrinho
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link href="/login" className="nav-link text-light">
                    <i className="fas fa-sign-in-alt me-1"></i>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/cadastro" className="nav-link text-light">
                    <i className="fas fa-user-plus me-1"></i>
                    Cadastro
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/carrinho" className="nav-link text-light">
                    <i className="fas fa-shopping-cart me-1"></i>
                    Carrinho
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
