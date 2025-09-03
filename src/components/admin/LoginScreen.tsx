'use client';

import { useAuthContext } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';

interface LoginScreenProps {
  onLogin: () => Promise<void>;
  error?: string | null;
  isAuthenticated?: boolean;
}

export default function LoginScreen({ onLogin, error, isAuthenticated }: LoginScreenProps) {
  const { user } = useAuthContext();
  const router = useRouter();

  const handleGoToOnboarding = () => {
    router.push('/onboarding');
  };

  const handleGoToLogin = () => {
    router.push('/login');
  };

  const handleGoToSignUp = () => {
    router.push('/cadastro');
  };

  // Se o usuário está autenticado mas não tem acesso administrativo
  if (isAuthenticated && user) {
    return (
      <div className="login-screen">
        <div className="container">
          <div className="row justify-content-center align-items-center min-vh-100">
            <div className="col-md-6 col-lg-4">
              <div className="card shadow-lg">
                <div className="card-body text-center p-5">
                  <div className="mb-4">
                    <i className="fas fa-exclamation-triangle fa-3x text-warning"></i>
                  </div>

                  <h2 className="card-title mb-4">Acesso Restrito</h2>

                  {error ? (
                    <div className="alert alert-warning mb-4">
                      <i className="fas fa-info-circle me-2"></i>
                      {error}
                    </div>
                  ) : (
                    <p className="text-muted mb-4">
                      Você está logado, mas não possui acesso administrativo.
                    </p>
                  )}

                  <div className="d-grid gap-3">
                    <button
                      className="btn btn-primary"
                      onClick={handleGoToOnboarding}
                    >
                      <i className="fas fa-store me-2"></i>
                      Cadastrar Restaurante
                    </button>

                    <button
                      className="btn btn-outline-secondary"
                      onClick={handleGoToLogin}
                    >
                      <i className="fas fa-sign-in-alt me-2"></i>
                      Fazer Login com Outra Conta
                    </button>

                    <button
                      className="btn btn-outline-info"
                      onClick={handleGoToSignUp}
                    >
                      <i className="fas fa-user-plus me-2"></i>
                      Criar Nova Conta
                    </button>
                  </div>

                  <div className="mt-4">
                    <small className="text-muted">
                      <i className="fas fa-shield-alt me-1"></i>
                      Acesso restrito apenas para proprietários de restaurantes
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Usuário não autenticado - mostrar opções de login
  return (
    <div className="login-screen">
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow-lg">
              <div className="card-body text-center p-5">
                <div className="mb-4">
                  <i className="fas fa-utensils fa-3x text-primary"></i>
                </div>

                <h2 className="card-title mb-4">Painel Administrativo</h2>
                <p className="text-muted mb-4">
                  Faça login para acessar o painel do seu restaurante
                </p>

                <div className="d-grid gap-3">
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={onLogin}
                  >
                    <i className="fab fa-google me-2"></i>
                    Entrar com Google
                  </button>

                  <button
                    className="btn btn-outline-primary"
                    onClick={handleGoToLogin}
                  >
                    <i className="fas fa-envelope me-2"></i>
                    Entrar com Email e Senha
                  </button>

                  <button
                    className="btn btn-outline-info"
                    onClick={handleGoToSignUp}
                  >
                    <i className="fas fa-user-plus me-2"></i>
                    Criar Nova Conta
                  </button>
                </div>

                <div className="mt-4">
                  <small className="text-muted">
                    <i className="fas fa-shield-alt me-1"></i>
                    Acesso restrito apenas para proprietários de restaurantes
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
