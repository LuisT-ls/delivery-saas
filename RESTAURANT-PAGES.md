# Páginas Públicas do Restaurante

Este documento descreve a implementação das páginas públicas do restaurante no sistema de delivery.

## Estrutura de Rotas

### 1. Menu do Restaurante

- **URL**: `/r/[restaurantId]/menu`
- **Descrição**: Exibe o cardápio completo do restaurante organizado por categorias
- **Arquivo**: `src/app/r/[restaurantId]/menu/page.tsx`

### 2. Detalhes do Item

- **URL**: `/r/[restaurantId]/item/[itemId]`
- **Descrição**: Página detalhada de um item específico do menu
- **Arquivo**: `src/app/r/[restaurantId]/item/[itemId]/page.tsx`

## Estrutura de Dados

### Coleções do Firestore

#### 1. `restaurants`

```typescript
{
  id: string;
  name: string;
  description: string;
  logo?: string;
  banner?: string;
  address: string;
  phone: string;
  email: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

#### 2. `categories`

```typescript
{
  id: string;
  restaurantId: string;
  name: string;
  description?: string;
  image?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

#### 3. `menu_items`

```typescript
{
  id: string;
  restaurantId: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  isAvailable: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

## Funcionalidades Implementadas

### ✅ Server Components

- Todas as páginas utilizam Next.js Server Components
- Dados são buscados diretamente no servidor
- SEO otimizado com metadados dinâmicos

### ✅ Bootstrap Cards

- Layout responsivo com Bootstrap 5.3.2
- Cards para exibição de produtos
- Design moderno e responsivo

### ✅ Navegação

- Links entre páginas do menu e detalhes
- Breadcrumbs e navegação intuitiva
- Botões de voltar e navegação

### ✅ Imagens

- Suporte a imagens de produtos e categorias
- Fallback para itens sem imagem
- Otimização de carregamento

### ✅ Preços

- Formatação em Real brasileiro (R$)
- Exibição clara e destacada
- Função utilitária reutilizável

## Como Usar

### 1. Popular Dados de Teste

```bash
npm run seed
```

### 2. URLs de Teste

Após executar o seed, você pode acessar:

- **Pizzaria Bella Italia**: http://localhost:3000/r/restaurant-1/menu
- **Hamburgueria Gourmet**: http://localhost:3000/r/restaurant-2/menu
- **Item específico**: http://localhost:3000/r/restaurant-1/item/item-1

### 3. Dados Mock Incluídos

#### Restaurantes

- Pizzaria Bella Italia (restaurant-1)
- Hamburgueria Gourmet (restaurant-2)

#### Categorias

- Pizzas Tradicionais
- Pizzas Especiais
- Bebidas
- Hambúrgueres Clássicos
- Hambúrgueres Gourmet
- Acompanhamentos

#### Itens do Menu

- 10 itens distribuídos entre as categorias
- Preços variados de R$ 6,90 a R$ 65,90
- Imagens do Unsplash para demonstração

## Arquivos Principais

### Estrutura de Dados

- `src/lib/types.ts` - Interfaces TypeScript
- `src/lib/restaurant-data.ts` - Funções de busca no Firestore
- `src/lib/utils.ts` - Funções utilitárias (formatação de preços)

### Páginas

- `src/app/r/[restaurantId]/menu/page.tsx` - Página do menu
- `src/app/r/[restaurantId]/item/[itemId]/page.tsx` - Página do item
- `src/app/r/layout.tsx` - Layout específico para páginas do restaurante

### Scripts

- `scripts/seed-data.js` - Script para popular dados mock

## Características Técnicas

### Performance

- Server-side rendering para melhor SEO
- Imagens otimizadas com lazy loading
- Código dividido por rotas

### Responsividade

- Design mobile-first
- Cards adaptáveis a diferentes tamanhos de tela
- Navegação otimizada para dispositivos móveis

### Acessibilidade

- Alt text em todas as imagens
- Estrutura semântica HTML
- Contraste adequado de cores

### SEO

- Metadados dinâmicos
- URLs amigáveis
- Estrutura de dados organizada

## Próximos Passos

1. **Funcionalidade de Carrinho**: Implementar adição de itens ao carrinho
2. **Sistema de Pedidos**: Criar fluxo de finalização de pedidos
3. **Filtros e Busca**: Adicionar filtros por categoria e busca por nome
4. **Avaliações**: Sistema de avaliações e comentários
5. **Favoritos**: Funcionalidade de favoritar itens
6. **Notificações**: Sistema de notificações para pedidos

## Configuração do Firebase

Certifique-se de que as seguintes variáveis de ambiente estão configuradas:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```
