'use client';

interface LoginScreenProps {
  onLogin: () => Promise<void>;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
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
                  Faça login com sua conta Google para acessar o painel do restaurante
                </p>

                <button
                  className="btn btn-primary btn-lg w-100"
                  onClick={onLogin}
                >
                  <i className="fab fa-google me-2"></i>
                  Entrar com Google
                </button>

                <div className="mt-4">
                  <small className="text-muted">
                    <i className="fas fa-shield-alt me-1"></i>
                    Acesso restrito apenas para funcionários autorizados
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
