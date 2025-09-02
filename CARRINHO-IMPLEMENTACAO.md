# 🛒 Implementação do Carrinho Global

Este documento descreve a implementação completa do sistema de carrinho global para o sistema de delivery.

## 📋 Funcionalidades Implementadas

### 1. Carrinho Global com Zustand

- **Store**: `src/lib/cart-store.ts`
- **Persistência**: Dados salvos no localStorage
- **Funcionalidades**:
  - Adicionar/remover itens
  - Atualizar quantidades
  - Cálculo automático de subtotal, taxas e total
  - Validação de restaurante único por carrinho

### 2. Componentes do Carrinho

#### CartWidget (`src/components/CartWidget.tsx`)

- Widget flutuante no canto inferior direito
- Mostra resumo do carrinho
- Botão para expandir/colapsar
- Navegação direta para checkout

#### AddToCartButton (`src/components/AddToCartButton.tsx`)

- Botão para adicionar itens ao carrinho
- Suporte a quantidade personalizada (duplo clique)
- Validação de restaurante

#### CartNotification (`src/components/CartNotification.tsx`)

- Notificação toast quando item é adicionado
- Auto-dismiss após 3 segundos

#### MenuItemCard (`src/components/MenuItemCard.tsx`)

- Card de item do menu com botão de adicionar ao carrinho
- Integração com AddToCartButton

### 3. Páginas Implementadas

#### Checkout (`/r/[restaurantId]/checkout`)

- Formulário de informações do cliente
- Resumo do pedido
- Validação de dados
- Criação do pedido no Firestore

#### Acompanhamento de Pedido (`/r/[restaurantId]/pedido/[orderId]`)

- Status em tempo real
- Atualização automática a cada 30 segundos
- Informações completas do pedido

### 4. Serviços

#### Orders (`src/lib/orders.ts`)

- `createOrder()`: Cria novo pedido
- `getOrder()`: Busca pedido por ID
- `getOrdersByRestaurant()`: Lista pedidos do restaurante
- `updateOrderStatus()`: Atualiza status do pedido

## 🗂️ Estrutura de Dados

### CartItem

```typescript
interface CartItem {
  itemId: string
  restaurantId: string
  name: string
  price: number
  image?: string
  quantity: number
  subtotal: number
}
```

### Order

```typescript
interface Order {
  id: string
  restaurantId: string
  items: OrderItem[]
  customer: CustomerInfo
  status:
    | 'pending'
    | 'confirmed'
    | 'preparing'
    | 'ready'
    | 'delivered'
    | 'cancelled'
  subtotal: number
  tax: number
  total: number
  createdAt: Date
  updatedAt: Date
}
```

## 🔄 Fluxo do Usuário

1. **Navegação**: Usuário acessa menu do restaurante
2. **Adição**: Clica em "Adicionar" nos itens desejados
3. **Carrinho**: Widget mostra resumo no canto da tela
4. **Checkout**: Clica em "Finalizar Pedido"
5. **Formulário**: Preenche dados pessoais e endereço
6. **Confirmação**: Pedido é criado no Firestore
7. **Acompanhamento**: Redirecionado para página de status

## 🎨 Interface do Usuário

### Carrinho Widget

- Posição: Canto inferior direito
- Cor: Bootstrap primary
- Responsivo: Adapta-se a diferentes tamanhos de tela
- Interativo: Expande/colapsa com animação

### Notificações

- Tipo: Toast notifications
- Posição: Topo central
- Duração: 3 segundos
- Estilo: Bootstrap alerts

### Formulário de Checkout

- Layout: 2 colunas (formulário + resumo)
- Validação: Campos obrigatórios
- Responsivo: Stack em telas menores

## 🔧 Configuração

### Dependências

```json
{
  "zustand": "^4.4.7"
}
```

### Variáveis de Ambiente

Nenhuma variável adicional necessária.

### Firestore Rules

```javascript
match /orders/{orderId} {
  allow create, read, update: if true;
}
```

## 🚀 Como Usar

### 1. Adicionar Item ao Carrinho

```typescript
import { useCartStore } from '@/lib/cart-store'

const addItem = useCartStore(state => state.addItem)
addItem(menuItem, quantity)
```

### 2. Acessar Dados do Carrinho

```typescript
const { items, total, restaurantId } = useCartStore()
```

### 3. Limpar Carrinho

```typescript
const clearCart = useCartStore(state => state.clearCart)
clearCart()
```

## 🐛 Troubleshooting

### Problema: Carrinho não persiste

- Verifique se o localStorage está habilitado
- Confirme que o Zustand persist está configurado

### Problema: Itens de restaurantes diferentes

- O sistema automaticamente valida e alerta
- Use `clearCart()` para limpar manualmente

### Problema: Pedido não é criado

- Verifique as regras do Firestore
- Confirme que o Firebase está configurado

## 📱 Responsividade

- **Mobile**: Widget compacto, formulário em coluna única
- **Tablet**: Layout intermediário
- **Desktop**: Layout completo com 2 colunas

## 🔮 Próximos Passos

1. **Pagamento**: Integração com gateway de pagamento
2. **Notificações**: Push notifications para status
3. **Histórico**: Página de pedidos anteriores
4. **Favoritos**: Sistema de itens favoritos
5. **Cupons**: Sistema de desconto

## 📚 Recursos

- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Bootstrap Documentation](https://getbootstrap.com/docs/)
