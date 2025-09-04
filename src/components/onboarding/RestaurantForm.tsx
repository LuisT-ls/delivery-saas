'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/components/AuthProvider';
import { useRestaurant } from '@/lib/useRestaurant';
import { RestaurantFormData } from '@/types/restaurant';

export default function RestaurantForm() {
  const { user } = useAuthContext();
  const router = useRouter();
  const { restaurant, loading, error, createRestaurant, updateRestaurant } = useRestaurant(user?.uid);

  const [formData, setFormData] = useState<RestaurantFormData>({
    name: '',
    address: '',
    phone: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Carregar dados do restaurante se existir
  useEffect(() => {
    if (restaurant) {
      setFormData({
        name: restaurant.name || '',
        address: restaurant.address || '',
        phone: restaurant.phone || ''
      });
      setIsEditing(true);
    }
  }, [restaurant]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.uid) {
      setMessage({ type: 'error', text: 'Usuário não autenticado. Faça login novamente.' });
      return;
    }

    // Validação mais robusta
    if (!formData.name.trim()) {
      setMessage({ type: 'error', text: 'Nome do restaurante é obrigatório' });
      return;
    }

    if (formData.name.trim().length < 3) {
      setMessage({ type: 'error', text: 'Nome do restaurante deve ter pelo menos 3 caracteres' });
      return;
    }

    if (!formData.address.trim()) {
      setMessage({ type: 'error', text: 'Endereço é obrigatório' });
      return;
    }

    if (formData.address.trim().length < 10) {
      setMessage({ type: 'error', text: 'Endereço deve ter pelo menos 10 caracteres' });
      return;
    }

    if (!formData.phone.trim()) {
      setMessage({ type: 'error', text: 'Telefone é obrigatório' });
      return;
    }

    // Validar formato de telefone brasileiro
    const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    if (!phoneRegex.test(formData.phone.trim())) {
      setMessage({ type: 'error', text: 'Telefone deve estar no formato (71) 99999-9999' });
      return;
    }

    setMessage(null);

    try {
      let success = false;

      if (isEditing) {
        // Atualizar restaurante existente
        success = await updateRestaurant(formData);
        if (success) {
          setMessage({ type: 'success', text: 'Restaurante atualizado com sucesso!' });
        }
      } else {
        // Criar novo restaurante
        success = await createRestaurant(formData);
        if (success) {
          setMessage({ type: 'success', text: 'Restaurante cadastrado com sucesso!' });
        }
      }

      if (success) {
        // Redirecionar para /admin após 2 segundos
        setTimeout(() => {
          router.push('/admin');
        }, 2000);
      } else {
        // Usar o erro específico do hook useRestaurant
        setMessage({
          type: 'error',
          text: error || 'Erro ao salvar restaurante. Tente novamente.'
        });
      }

    } catch (error: any) {
      console.error('Erro ao salvar restaurante:', error);

      // Tratamento específico de erros
      let errorMessage = 'Erro ao salvar restaurante. Tente novamente.';

      if (error?.code === 'permission-denied') {
        errorMessage = 'Permissão negada. Verifique se você está logado e tente novamente.';
      } else if (error?.code === 'unavailable') {
        errorMessage = 'Serviço temporariamente indisponível. Tente novamente em alguns minutos.';
      } else if (error?.message) {
        errorMessage = `Erro: ${error.message}`;
      }

      setMessage({
        type: 'error',
        text: errorMessage
      });
    }
  };

  return (
    <div className="container mt-3 mt-md-4 px-3">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <div className="card shadow onboarding-card">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0 h4-responsive h3-md-responsive">
                {isEditing ? 'Editar Restaurante' : 'Cadastro do Restaurante'}
              </h3>
            </div>
            <div className="card-body p-3 p-md-4">
              {message && (
                <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`}>
                  <span className="h6-responsive">{message.text}</span>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setMessage(null)}
                    aria-label="Fechar"
                  ></button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="onboarding-form">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label h6-responsive">
                    <i className="fas fa-store"></i>
                    Nome do Restaurante
                  </label>
                  <input
                    type="text"
                    className="form-control w-100"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Digite o nome do restaurante"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="address" className="form-label h6-responsive">
                    <i className="fas fa-map-marker-alt"></i>
                    Endereço
                  </label>
                  <input
                    type="text"
                    className="form-control w-100"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Digite o endereço completo"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="phone" className="form-label h6-responsive">
                    <i className="fas fa-phone"></i>
                    Telefone/WhatsApp
                  </label>
                  <input
                    type="tel"
                    className="form-control w-100"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(71) 99999-9999"
                    required
                  />
                </div>

                <div className="d-grid d-md-flex justify-content-md-end">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100 w-md-auto"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        <span className="h6-responsive">
                          {isEditing ? 'Atualizando...' : 'Criando...'}
                        </span>
                      </>
                    ) : (
                      <span className="h6-responsive">
                        {isEditing ? 'Atualizar Restaurante' : 'Criar Restaurante'}
                      </span>
                    )}
                  </button>
                </div>

                {loading && (
                  <div className="text-center mt-3">
                    <small className="text-muted h6-responsive">
                      <i className="fas fa-spinner fa-spin me-1"></i>
                      Processando...
                    </small>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
