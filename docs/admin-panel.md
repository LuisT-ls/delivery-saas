# Painel Administrativo do Restaurante

## Visão Geral

O painel administrativo é uma interface web desenvolvida para restaurantes gerenciarem seus pedidos em tempo real. Localizado em `/admin`, oferece uma experiência completa de gestão de pedidos com autenticação segura e atualizações em tempo real.

## Funcionalidades

### 🔐 Autenticação Segura

- **Login com Google**: Autenticação obrigatória via Firebase Auth
- **Acesso Restrito**: Apenas usuários autorizados podem acessar
- **Logout Seguro**: Sessão encerrada adequadamente

### 📋 Gestão de Pedidos em Tempo Real

- **onSnapshot**: Atualizações automáticas via Firestore
- **Filtro por Restaurante**: Pedidos filtrados por `restaurantId`
- **Ordenação**: Pedidos ordenados por data de criação (mais recentes primeiro)

### 🎯 Quadro Kanban

O painel organiza os pedidos em colunas por status:

1. **Pendentes** (pending)

   - Ícone: ⏰
   - Cor: Amarelo
   - Ação: "Iniciar Preparo"

2. **Preparando** (preparing)

   - Ícone: 🔥
   - Cor: Azul
   - Ação: "Marcar Pronto"

3. **Prontos** (ready)

   - Ícone: ✅
   - Cor: Verde
   - Ação: "Iniciar Entrega"

4. **Entregando** (delivering)

   - Ícone: 🚚
   - Cor: Azul Primário
   - Ação: "Confirmar Entrega"

5. **Entregues** (delivered)
   - Ícone: 🏁
   - Cor: Cinza
   - Sem ação (finalizado)

### 🔔 Notificações

- **Alerta Sonoro**: Som automático para novos pedidos
- **Alerta Visual**: Banner verde com mensagem de notificação
- **Fallback**: Web Audio API quando arquivo de som não disponível

### 📱 Interface Responsiva

- **Desktop**: Layout em colunas lado a lado
- **Mobile**: Colunas empilhadas verticalmente
- **Scroll**: Área de pedidos com scroll independente

## Estrutura de Arquivos

```
src/
├── app/admin/
│   └── page.tsx                 # Página principal do admin
├── components/admin/
│   ├── LoginScreen.tsx         # Tela de login
│   ├── LoadingScreen.tsx       # Tela de carregamento
│   ├── OrderBoard.tsx          # Quadro de pedidos
│   ├── OrderCard.tsx           # Card individual de pedido
│   └── NotificationSound.tsx   # Componente de som
├── lib/
│   ├── admin-hooks.ts          # Hooks personalizados
│   ├── auth.ts                 # Autenticação
│   ├── orders.ts               # Operações de pedidos
│   └── types.ts                # Tipos TypeScript
└── app/globals.css             # Estilos CSS
```

## Tecnologias Utilizadas

- **Next.js 14**: Framework React
- **Firebase**: Autenticação e Firestore
- **Bootstrap 5**: UI Framework
- **FontAwesome**: Ícones
- **TypeScript**: Tipagem estática
- **Web Audio API**: Som de notificação

## Configuração

### Pré-requisitos

1. Firebase configurado com Auth e Firestore
2. Bootstrap e FontAwesome instalados
3. Variáveis de ambiente configuradas

### Variáveis de Ambiente

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Uso

### Acesso

1. Navegue para `/admin`
2. Faça login com conta Google
3. Acesse o painel de pedidos

### Gestão de Pedidos

1. **Visualizar**: Pedidos organizados por status
2. **Atualizar**: Clique nos botões de ação
3. **Monitorar**: Notificações automáticas
4. **Navegar**: Scroll nas colunas de pedidos

### Funcionalidades Avançadas

- **Tempo Real**: Atualizações automáticas
- **Responsivo**: Funciona em todos os dispositivos
- **Acessível**: Suporte a leitores de tela
- **Performance**: Otimizado para grandes volumes

## Segurança

- **Autenticação Obrigatória**: Sem acesso anônimo
- **Validação de Usuário**: Verificação de conta Google
- **Filtro de Dados**: Apenas pedidos do restaurante
- **Logout Seguro**: Limpeza de sessão

## Manutenção

### Adicionar Novos Status

1. Atualizar `types.ts` com novo status
2. Adicionar configuração em `OrderBoard.tsx`
3. Implementar lógica de transição

### Personalizar Notificações

1. Adicionar arquivo de som em `public/sounds/`
2. Configurar em `NotificationSound.tsx`
3. Ajustar timing e volume

### Estilização

1. Modificar `globals.css`
2. Usar classes Bootstrap
3. Manter responsividade

## Troubleshooting

### Problemas Comuns

- **Som não toca**: Verificar permissões do navegador
- **Pedidos não carregam**: Verificar conexão Firebase
- **Login falha**: Verificar configuração Auth
- **Layout quebrado**: Verificar Bootstrap

### Logs

- Console do navegador para erros
- Firebase Console para logs de Auth/Firestore
- Network tab para problemas de rede
