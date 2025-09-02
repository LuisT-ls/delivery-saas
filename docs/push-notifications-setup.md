# Configuração de Notificações Push

Este documento explica como configurar as notificações push para o sistema de delivery SaaS.

## Pré-requisitos

1. **Firebase Project**: Certifique-se de que o projeto Firebase está configurado
2. **VAPID Key**: Configure a VAPID key no Firebase Console
3. **Service Worker**: O service worker já está configurado em `public/sw.js`

## Configuração do Firebase

### 1. Configurar Firebase Cloud Messaging

1. Acesse o [Firebase Console](https://console.firebase.google.com)
2. Selecione seu projeto
3. Vá para **Project Settings** > **Cloud Messaging**
4. Na aba **Web Push certificates**, gere uma nova VAPID key
5. Copie a VAPID key

### 2. Configurar Variáveis de Ambiente

Adicione a VAPID key ao arquivo `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_VAPID_KEY=sua_vapid_key_aqui
```

### 3. Configurar Cloud Functions

1. Instale o Firebase CLI globalmente:
```bash
npm install -g firebase-tools
```

2. Faça login no Firebase:
```bash
firebase login
```

3. Inicialize o projeto (se ainda não foi feito):
```bash
firebase init functions
```

4. Instale as dependências das functions:
```bash
cd functions
npm install
```

5. Deploy das Cloud Functions:
```bash
firebase deploy --only functions
```

## Como Funciona

### 1. Registro de Dispositivo

Quando um usuário admin faz login em `/admin`:

1. O sistema solicita permissão para notificações
2. Se a permissão for concedida, obtém o token FCM
3. Salva o token no Firestore em `/restaurants/{restaurantId}/devices/{token}`
4. O token é associado ao usuário e restaurante

### 2. Envio de Notificações

Quando um novo pedido é criado:

1. A Cloud Function `sendNewOrderNotification` é acionada
2. Busca todos os tokens de dispositivos do restaurante
3. Envia notificação push para todos os dispositivos registrados
4. Remove tokens inválidos automaticamente

### 3. Recebimento de Notificações

- **Em primeiro plano**: A notificação é recebida via `onMessage`
- **Em background**: A notificação é recebida pelo service worker
- **Clicar na notificação**: Abre a página `/admin`

## Estrutura de Dados

### Collection: `restaurants/{restaurantId}/devices/{token}`

```json
{
  "token": "fcm_token_aqui",
  "userId": "user_id",
  "userEmail": "user@example.com",
  "createdAt": "2024-01-01T00:00:00Z",
  "lastUsed": "2024-01-01T00:00:00Z",
  "platform": "Win32",
  "userAgent": "Mozilla/5.0...",
  "deleted": false
}
```

## Testando

### 1. Teste Local

1. Inicie o emulador do Firebase:
```bash
firebase emulators:start
```

2. Teste as functions localmente:
```bash
firebase functions:shell
```

### 2. Teste em Produção

1. Faça login em `/admin`
2. Ative as notificações
3. Crie um novo pedido
4. Verifique se a notificação foi recebida

## Troubleshooting

### Problemas Comuns

1. **Permissão negada**: Verifique se o usuário concedeu permissão
2. **Token não salvo**: Verifique as regras do Firestore
3. **Notificação não enviada**: Verifique os logs das Cloud Functions
4. **Token inválido**: O sistema remove automaticamente tokens inválidos

### Logs

- **Client-side**: Verifique o console do navegador
- **Server-side**: Verifique os logs das Cloud Functions no Firebase Console

## Limpeza Automática

Uma Cloud Function `cleanupOldTokens` executa diariamente às 2h da manhã para:

- Remover tokens de dispositivos não utilizados há 30 dias
- Remover tokens marcados como deletados
- Manter a base de dados limpa

## Segurança

- Tokens são associados a usuários autenticados
- Regras do Firestore protegem o acesso aos dados
- Tokens inválidos são removidos automaticamente
- Limpeza periódica remove dados antigos
