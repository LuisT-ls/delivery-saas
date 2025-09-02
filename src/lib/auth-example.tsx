'use client';

import React, { useState, useEffect } from 'react';
import {
  signInWithGoogle,
  signInAnonymously,
  signOutUser,
  getCurrentUser,
  isAnonymousUser,
  isGoogleUser,
  onAuthStateChange
} from './auth';

export default function AuthExample() {
  const [user, setUser] = useState(getCurrentUser());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Listener para mudanças no estado de autenticação
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      console.log('Login com Google realizado com sucesso!');
    } catch (error) {
      console.error('Erro no login com Google:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnonymousLogin = async () => {
    setLoading(true);
    try {
      await signInAnonymously();
      console.log('Login anônimo realizado com sucesso!');
    } catch (error) {
      console.error('Erro no login anônimo:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOutUser();
      console.log('Logout realizado com sucesso!');
    } catch (error) {
      console.error('Erro no logout:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4>Exemplo de Autenticação Firebase</h4>
            </div>
            <div className="card-body">
              {!user ? (
                <div>
                  <p className="text-muted mb-3">
                    Escolha um método de login:
                  </p>
                  <div className="d-grid gap-2">
                    <button
                      className="btn btn-primary"
                      onClick={handleGoogleLogin}
                      disabled={loading}
                    >
                      {loading ? 'Carregando...' : 'Login com Google (Admin/Staff)'}
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={handleAnonymousLogin}
                      disabled={loading}
                    >
                      {loading ? 'Carregando...' : 'Login Anônimo (Cliente)'}
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="alert alert-success">
                    <h5>Usuário Logado!</h5>
                    <p><strong>UID:</strong> {user.uid}</p>
                    <p><strong>Email:</strong> {user.email || 'N/A'}</p>
                    <p><strong>Tipo:</strong> {isAnonymousUser() ? 'Anônimo' : 'Google'}</p>
                    {isGoogleUser() && (
                      <p><strong>Nome:</strong> {user.displayName || 'N/A'}</p>
                    )}
                  </div>
                  <button
                    className="btn btn-danger"
                    onClick={handleLogout}
                    disabled={loading}
                  >
                    {loading ? 'Carregando...' : 'Logout'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
