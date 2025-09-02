# Painel do Restaurante - Documentação

## Visão Geral

O painel do restaurante é uma interface administrativa protegida que permite aos restaurantes gerenciar pedidos em tempo real. O painel está localizado em `/admin` e oferece funcionalidades completas para controle de pedidos.

## Funcionalidades Implementadas

### ✅ Autenticação

- **Login com Google (Firebase Auth)**: Apenas usuários autenticados com Google podem acessar o painel
- **Proteção de rota**: Redirecionamento automático para tela de login se não autenticado
- **Logout**: Botão para sair da sessão

### ✅ Listagem de Pedidos em Tempo Real

- **onSnapshot**: Escuta mudanças na coleção 'orders' do Firestore
- **Filtro por restaurantId**: Apenas pedidos do restaurante logado são exibidos
- **Ordenação**: Pedidos ordenados por data de criação (mais recentes primeiro)

### ✅ Colunas por Status

O painel organiza os pedidos em 5 colunas:

1. **Pendentes** (pending) - Novos pedidos aguardando aceitação
2. **Preparando** (preparing) - Pedidos em preparação
3. **Prontos** (ready) - Pedidos prontos para entrega
4. **Entregando** (delivering) - Pedidos em rota
5. **Entregues** (delivered) - Pedidos finalizados

### ✅ Atualização de Status

- **Botões de ação**: Cada pedido tem botões para avançar para o próximo status
- **Feedback visual**: Indicadores de loading durante atualização
- **Validação**: Prevenção de cliques múltiplos

### ✅ Alertas de Novos Pedidos

- **Som de notificação**: Beep sonoro quando chega novo pedido
- **Alerta visual**: Banner verde temporário
- **Notificações do navegador**: Quando a página não está visível
- **Permissão automática**: Solicita permissão de notificação no login

### ✅ Interface Avançada

- **Estatísticas**: Cards com métricas em tempo real
- **Indicadores de urgência**: Pedidos com mais de 30 minutos ficam destacados
- **Responsividade**: Interface adaptada para mobile
- **Animações**: Efeitos visuais para melhor UX

## Estrutura de Arquivos

```
src/
├── app/admin/
│   └── page.tsx                 # Página principal do painel
├── components/admin/
│   ├── OrderBoard.tsx          # Layout das colunas de status
│   ├── OrderCard.tsx           # Card individual do pedido
│   ├── StatsCard.tsx           # Cards de estatísticas
│   ├── NotificationSound.tsx   # Componente de som
│   ├── LoginScreen.tsx         # Tela de login
│   └── LoadingScreen.tsx       # Tela de carregamento
└── lib/
    ├── admin-hooks.ts          # Hooks personalizados
    ├── auth.ts                 # Autenticação Firebase
    ├── orders.ts               # Operações com pedidos
    └── types.ts                # Tipos TypeScript
```

## Fluxo de Pedidos

1. **Novo Pedido**: Cliente faz pedido → aparece na coluna "Pendentes"
2. **Aceitar**: Restaurante clica "Aceitar Pedido" → move para "Preparando"
3. **Preparar**: Restaurante clica "Marcar Pronto" → move para "Prontos"
4. **Entregar**: Restaurante clica "Iniciar Entrega" → move para "Entregando"
5. **Finalizar**: Restaurante clica "Confirmar Entrega" → move para "Entregues"

## Configuração

### Firebase

- Autenticação Google habilitada
- Firestore com coleção 'orders'
- Regras de segurança configuradas

### Variáveis de Ambiente

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
```

## Uso

1. Acesse `/admin` no navegador
2. Faça login com sua conta Google
3. O painel carregará automaticamente os pedidos do seu restaurante
4. Use os botões de ação para atualizar o status dos pedidos
5. Monitore as estatísticas e alertas de novos pedidos

## Recursos Técnicos

- **Next.js 13+** com App Router
- **Firebase 9+** com modular API
- **TypeScript** para type safety
- **Bootstrap 5** para UI
- **Font Awesome** para ícones
- **Web Audio API** para sons
- **Service Workers** para notificações

## Melhorias Futuras

- [ ] Filtros por data/hora
- [ ] Busca de pedidos
- [ ] Relatórios detalhados
- [ ] Configurações do restaurante
- [ ] Integração com impressora térmica
- [ ] Modo offline
- [ ] Múltiplos restaurantes por usuário
