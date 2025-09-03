# Funcionalidade de Onboarding

## Visão Geral

A funcionalidade de onboarding permite que usuários autenticados criem e gerenciem seus restaurantes no sistema. É implementada através da rota `/onboarding` e inclui autenticação Firebase, integração com Firestore e interface responsiva.

## Estrutura dos Arquivos

```
src/
├── app/
│   └── onboarding/
│       └── page.tsx              # Página principal de onboarding
├── components/
│   └── onboarding/
│       └── RestaurantForm.tsx    # Formulário de cadastro/edição
├── lib/
│   └── useRestaurant.ts          # Hook personalizado para operações CRUD
└── types/
    └── restaurant.ts             # Tipos TypeScript
```

## Funcionalidades

### 1. Autenticação

- **Login com Google**: Usuários devem fazer login com Google para acessar o onboarding
- **Verificação de estado**: A página verifica se o usuário está autenticado antes de mostrar o formulário
- **Redirecionamento**: Usuários não autenticados veem um botão de login

### 2. Formulário de Restaurante

- **Campos obrigatórios**:
  - Nome do restaurante
  - Endereço
  - Telefone/WhatsApp
- **Validação**: Todos os campos são obrigatórios
- **Ícones**: FontAwesome para melhor UX (fa-store, fa-map-marker-alt, fa-phone)

### 3. Integração Firestore

- **Coleção**: `restaurants/{userId}`
- **Estrutura do documento**:
  ```typescript
  {
    name: string,
    address: string,
    phone: string,
    ownerId: string,
    createdAt: Timestamp,
    updatedAt: Timestamp
  }
  ```
- **Operações**:
  - Criar novo restaurante
  - Atualizar restaurante existente
  - Carregar dados para edição

### 4. Fluxo de Usuário

1. Usuário acessa `/onboarding`
2. Se não estiver logado, vê botão "Entrar com Google"
3. Após login, vê formulário de cadastro
4. Se restaurante já existe, dados são carregados para edição
5. Ao salvar, usuário é redirecionado para `/admin`

### 5. UI/UX

- **Bootstrap 5**: Layout responsivo e moderno
- **Feedback visual**: Loading states, mensagens de sucesso/erro
- **Responsividade**: Funciona em dispositivos móveis e desktop
- **Acessibilidade**: Labels apropriados e estrutura semântica

## Regras de Segurança

### Firestore Rules

```javascript
match /restaurants/{restaurantId} {
  allow read: if true;
  allow write: if request.auth != null;
}
```

- **Leitura**: Pública (permite visualização de restaurantes)
- **Escrita**: Apenas usuários autenticados
- **Segurança**: Cada usuário só pode editar seu próprio restaurante (userId = restaurantId)

## Uso

### Para Desenvolvedores

#### Hook useRestaurant

```typescript
const { restaurant, loading, error, createRestaurant, updateRestaurant } =
  useRestaurant(userId)
```

#### Componente RestaurantForm

```typescript
import RestaurantForm from '@/components/onboarding/RestaurantForm'

// Renderiza automaticamente baseado no estado de autenticação
;<RestaurantForm />
```

### Para Usuários

1. Acesse `/onboarding`
2. Faça login com Google
3. Preencha os dados do restaurante
4. Clique em "Criar Restaurante"
5. Seja redirecionado para o painel admin

## Dependências

- **Firebase**: Autenticação e Firestore
- **Bootstrap**: UI framework
- **FontAwesome**: Ícones
- **Next.js**: Framework React
- **TypeScript**: Tipagem estática

## Testes

Para testar a funcionalidade:

1. Execute `npm run dev`
2. Acesse `http://localhost:3000/onboarding`
3. Teste o fluxo de login e cadastro
4. Verifique a criação/edição no Firestore
5. Teste o redirecionamento para `/admin`

## Troubleshooting

### Problemas Comuns

1. **Erro de autenticação**: Verifique se as credenciais Firebase estão configuradas
2. **Erro de permissão**: Verifique as regras do Firestore
3. **Formulário não carrega**: Verifique se o usuário está autenticado
4. **Redirecionamento falha**: Verifique se a rota `/admin` existe

### Logs

Os logs importantes são exibidos no console do navegador:

- Erros de autenticação
- Erros de Firestore
- Operações de CRUD
- Estados de loading

