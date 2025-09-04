'use client';

import { useState } from 'react';
import { useMenuItems, MenuItemFormData } from '@/lib/useMenuItems';
import { MenuItem } from '@/types/restaurant';

interface MenuManagementProps {
  restaurantId: string;
}

export default function MenuManagement({ restaurantId }: MenuManagementProps) {
  const {
    menuItems,
    loading,
    error,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    toggleItemAvailability
  } = useMenuItems(restaurantId);

  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState<MenuItemFormData>({
    name: '',
    description: '',
    price: 0,
    image: ''
  });
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'price') {
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

    // Validações
    if (!formData.name.trim()) {
      setMessage({ type: 'error', text: 'Nome do prato é obrigatório' });
      return;
    }

    if (!formData.description.trim()) {
      setMessage({ type: 'error', text: 'Descrição é obrigatória' });
      return;
    }

    if (formData.price <= 0) {
      setMessage({ type: 'error', text: 'Preço deve ser maior que zero' });
      return;
    }

    setMessage(null);

    try {
      let success = false;

      if (editingItem) {
        // Atualizar item existente
        success = await updateMenuItem(editingItem.id!, formData);
        if (success) {
          setMessage({ type: 'success', text: 'Prato atualizado com sucesso!' });
          setEditingItem(null);
        }
      } else {
        // Criar novo item
        success = await createMenuItem(formData);
        if (success) {
          setMessage({ type: 'success', text: 'Prato adicionado com sucesso!' });
        }
      }

      if (success) {
        setFormData({ name: '', description: '', price: 0, image: '' });
        setShowForm(false);
      } else {
        setMessage({ type: 'error', text: error || 'Erro ao salvar prato. Tente novamente.' });
      }
    } catch (error: any) {
      console.error('Erro ao salvar prato:', error);
      setMessage({ type: 'error', text: 'Erro ao salvar prato. Tente novamente.' });
    }
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (itemId: string) => {
    if (window.confirm('Tem certeza que deseja remover este prato?')) {
      const success = await deleteMenuItem(itemId);
      if (success) {
        setMessage({ type: 'success', text: 'Prato removido com sucesso!' });
      } else {
        setMessage({ type: 'error', text: error || 'Erro ao remover prato. Tente novamente.' });
      }
    }
  };

  const handleToggleAvailability = async (itemId: string, currentStatus: boolean) => {
    const success = await toggleItemAvailability(itemId, !currentStatus);
    if (success) {
      setMessage({
        type: 'success',
        text: `Prato ${!currentStatus ? 'disponibilizado' : 'indisponibilizado'} com sucesso!`
      });
    } else {
      setMessage({ type: 'error', text: error || 'Erro ao alterar disponibilidade. Tente novamente.' });
    }
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', price: 0, image: '' });
    setEditingItem(null);
    setShowForm(false);
    setMessage(null);
  };

  return (
    <div className="menu-management">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">
          <i className="fas fa-utensils me-2"></i>
          Gerenciamento de Pratos
        </h3>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
          disabled={loading}
        >
          <i className="fas fa-plus me-2"></i>
          Adicionar Prato
        </button>
      </div>

      {message && (
        <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`}>
          <span>{message.text}</span>
          <button
            type="button"
            className="btn-close"
            onClick={() => setMessage(null)}
            aria-label="Fechar"
          ></button>
        </div>
      )}

      {error && (
        <div className="alert alert-danger">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error}
        </div>
      )}

      {/* Formulário de Adição/Edição */}
      {showForm && (
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="mb-0">
              {editingItem ? 'Editar Prato' : 'Adicionar Novo Prato'}
            </h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="name" className="form-label">
                    <i className="fas fa-tag me-1"></i>
                    Nome do Prato
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Digite o nome do prato"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="price" className="form-label">
                    <i className="fas fa-dollar-sign me-1"></i>
                    Preço (R$)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    className="form-control"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  <i className="fas fa-align-left me-1"></i>
                  Descrição
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Descreva o prato"
                  rows={3}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  <i className="fas fa-image me-1"></i>
                  URL da Imagem
                </label>
                <input
                  type="url"
                  className="form-control"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </div>

              <div className="d-flex gap-2">
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Salvando...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save me-2"></i>
                      {editingItem ? 'Atualizar' : 'Adicionar'}
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={resetForm}
                  disabled={loading}
                >
                  <i className="fas fa-times me-2"></i>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lista de Pratos */}
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">
            <i className="fas fa-list me-2"></i>
            Pratos Cadastrados ({menuItems.length})
          </h5>
        </div>
        <div className="card-body">
          {loading && menuItems.length === 0 ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
              <p className="mt-2 text-muted">Carregando pratos...</p>
            </div>
          ) : menuItems.length === 0 ? (
            <div className="text-center py-4">
              <i className="fas fa-utensils fa-3x text-muted mb-3"></i>
              <h5 className="text-muted">Nenhum prato cadastrado</h5>
              <p className="text-muted">Adicione seu primeiro prato para começar!</p>
            </div>
          ) : (
            <div className="row g-3">
              {menuItems.map((item) => (
                <div key={item.id} className="col-md-6 col-lg-4">
                  <div className="card h-100">
                    {item.image && (
                      <img
                        src={item.image}
                        className="card-img-top"
                        alt={item.name}
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                    )}
                    <div className="card-body d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h6 className="card-title mb-0">{item.name}</h6>
                        <span className={`badge ${item.isAvailable ? 'bg-success' : 'bg-secondary'}`}>
                          {item.isAvailable ? 'Disponível' : 'Indisponível'}
                        </span>
                      </div>
                      <p className="card-text text-muted small flex-grow-1">
                        {item.description}
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="h6 text-primary mb-0">
                          R$ {item.price.toFixed(2)}
                        </span>
                        <div className="btn-group btn-group-sm">
                          <button
                            className="btn btn-outline-primary"
                            onClick={() => handleEdit(item)}
                            title="Editar"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            className={`btn ${item.isAvailable ? 'btn-outline-warning' : 'btn-outline-success'}`}
                            onClick={() => handleToggleAvailability(item.id!, item.isAvailable)}
                            title={item.isAvailable ? 'Indisponibilizar' : 'Disponibilizar'}
                          >
                            <i className={`fas ${item.isAvailable ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                          </button>
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => handleDelete(item.id!)}
                            title="Remover"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
