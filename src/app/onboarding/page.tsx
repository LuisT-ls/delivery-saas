'use client';

import { useAuthContext } from '@/components/AuthProvider';
import RestaurantForm from '@/components/onboarding/RestaurantForm';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function OnboardingPage() {
  const { user, loading, loginWithGoogle, isAuthenticated } = useAuthContext();

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };

  if (loading) {
    return (
      <div className="container mt-3 mt-md-5 px-3">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 text-center">
            <LoadingSpinner />
            <p className="mt-3 h5-responsive">Carregando...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="container mt-3 mt-md-5 px-3">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card shadow text-center">
              <div className="card-body p-3 p-md-5">
                <div className="mb-4">
                  <i className="fas fa-store fa-2x fa-md-3x text-primary mb-3"></i>
                  <h2 className="card-title h3-responsive h2-md-responsive">Cadastro do Restaurante</h2>
                  <p className="card-text text-muted h6-responsive">
                    Faça login para cadastrar ou editar seu restaurante
                  </p>
                </div>

                <button
                  onClick={handleGoogleLogin}
                  className="btn btn-primary btn-lg w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Entrando...
                    </>
                  ) : (
                    <>
                      <i className="fab fa-google me-2"></i>
                      Entrar com Google
                    </>
                  )}
                </button>

                <div className="mt-4">
                  <small className="text-muted h6-responsive">
                    <i className="fas fa-shield-alt me-1"></i>
                    Seus dados estão seguros e protegidos
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <RestaurantForm />;
}

