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
    phone: '',
    category: '',
    deliveryFee: 0,
    deliveryTime: '',
    rating: 0,
    image: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Carregar dados do restaurante se existir
  useEffect(() => {
    if (restaurant) {
      setFormData({
        name: restaurant.name || '',
        address: restaurant.address || '',
        phone: restaurant.phone || '',
        category: restaurant.category || '',
        deliveryFee: restaurant.deliveryFee || 0,
        deliveryTime: restaurant.deliveryTime || '',
        rating: restaurant.rating || 0,
        image: restaurant.image || ''
      });
      setIsEditing(true);
    }
  }, [restaurant]);

  const formatPhoneNumber = (value: string) => {
    // Remove todos os caracteres não numéricos
    const numbers = value.replace(/\D/g, '');

    // Se não há números, retorna vazio
    if (!numbers) return '';

    // Se tem 2 dígitos ou menos, retorna apenas os números
    if (numbers.length <= 2) return numbers;

    // Se tem 3 dígitos, formata como (XX) X
    if (numbers.length === 3) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    }

    // Se tem 4-7 dígitos, formata como (XX) X XXXX
    if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 3)} ${numbers.slice(3)}`;
    }

    // Se tem 8-11 dígitos, formata como (XX) X XXXX-XXXX
    if (numbers.length <= 11) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 3)} ${numbers.slice(3, 7)}-${numbers.slice(7)}`;
    }

    // Se tem mais de 11 dígitos, limita a 11 e formata
    const limitedNumbers = numbers.slice(0, 11);
    return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2, 3)} ${limitedNumbers.slice(3, 7)}-${limitedNumbers.slice(7)}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Formatação especial para o campo de telefone
    if (name === 'phone') {
      const formattedValue = formatPhoneNumber(value);
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
    } else if (name === 'deliveryFee' || name === 'rating') {
      setFormData(prev => ({
        ...prev,
        [name]: parseFloat(value) || 0
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
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

    // Validar formato de telefone brasileiro (aceita tanto celular quanto fixo)
    const phoneRegex = /^\(\d{2}\) \d \d{4}-\d{4}$/;
    if (!phoneRegex.test(formData.phone.trim())) {
      setMessage({ type: 'error', text: 'Telefone deve estar no formato (71) 9 9545-4555' });
      return;
    }

    if (!formData.category.trim()) {
      setMessage({ type: 'error', text: 'Categoria do restaurante é obrigatória' });
      return;
    }

    if (formData.deliveryFee < 0) {
      setMessage({ type: 'error', text: 'Taxa de entrega não pode ser negativa' });
      return;
    }

    if (!formData.deliveryTime.trim()) {
      setMessage({ type: 'error', text: 'Tempo de entrega é obrigatório' });
      return;
    }

    if (formData.rating < 0 || formData.rating > 5) {
      setMessage({ type: 'error', text: 'Avaliação deve estar entre 0 e 5' });
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
    <div className="container mt-3 mt-md-4 mb-5 mb-md-6 px-3">
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

                <div className="mb-3">
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
                    placeholder="Digite apenas os números (ex: 71995454555)"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="category" className="form-label h6-responsive">
                    <i className="fas fa-utensils"></i>
                    Categoria do Restaurante
                  </label>
                  <select
                    className="form-select w-100"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Selecione uma categoria</option>
                    <option value="Italiana">Italiana</option>
                    <option value="Japonesa">Japonesa</option>
                    <option value="Hambúrgueres">Hambúrgueres</option>
                    <option value="Pizzaria">Pizzaria</option>
                    <option value="Churrascaria">Churrascaria</option>
                    <option value="Doces e Sobremesas">Doces e Sobremesas</option>
                    <option value="Brasileira">Brasileira</option>
                    <option value="Árabe">Árabe</option>
                    <option value="Chinesa">Chinesa</option>
                    <option value="Mexicana">Mexicana</option>
                    <option value="Vegetariana">Vegetariana</option>
                    <option value="Vegana">Vegana</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="deliveryFee" className="form-label h6-responsive">
                      <i className="fas fa-motorcycle"></i>
                      Taxa de Entrega (R$)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      className="form-control w-100"
                      id="deliveryFee"
                      name="deliveryFee"
                      value={formData.deliveryFee}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="deliveryTime" className="form-label h6-responsive">
                      <i className="fas fa-clock"></i>
                      Tempo de Entrega
                    </label>
                    <input
                      type="text"
                      className="form-control w-100"
                      id="deliveryTime"
                      name="deliveryTime"
                      value={formData.deliveryTime}
                      onChange={handleInputChange}
                      placeholder="ex: 30-45 min"
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="rating" className="form-label h6-responsive">
                      <i className="fas fa-star"></i>
                      Avaliação Inicial (0-5)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      className="form-control w-100"
                      id="rating"
                      name="rating"
                      value={formData.rating}
                      onChange={handleInputChange}
                      placeholder="0.0"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="image" className="form-label h6-responsive">
                      <i className="fas fa-image"></i>
                      URL da Imagem
                    </label>
                    <input
                      type="url"
                      className="form-control w-100"
                      id="image"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="https://exemplo.com/imagem.jpg"
                    />
                  </div>
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
