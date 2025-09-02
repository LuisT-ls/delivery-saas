'use client';

import { useCart } from '@/lib/use-cart';

export default function CartTestButton() {
  const { addItem, isReady, items, itemCount } = useCart();

  // Só mostrar em desenvolvimento
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const handleTestAdd = () => {
    if (isReady) {
      const testItem = {
        id: 'test-' + Date.now(),
        restaurantId: 'test-restaurant',
        name: 'Item de Teste',
        price: 10.50,
        image: '',
        description: 'Item para teste',
        categoryId: 'test-category',
        isAvailable: true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const success = addItem(testItem, 1);
      console.log('Teste de adicionar item:', { success, testItem });
    }
  };

  return (
    <div className="position-fixed top-0 end-0 m-3 p-2 bg-warning text-dark" style={{ zIndex: 1070, fontSize: '11px' }}>
      <div>🧪 Teste</div>
      <div>Ready: {isReady ? '✅' : '❌'}</div>
      <div>Items: {itemCount}</div>
      <button
        className="btn btn-sm btn-outline-dark"
        onClick={handleTestAdd}
        disabled={!isReady}
      >
        + Item Teste
      </button>
    </div>
  );
}
