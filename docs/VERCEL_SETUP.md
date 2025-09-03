# Configuração do Vercel com Firebase

## Variáveis de Ambiente Necessárias

Para que a autenticação funcione corretamente no Vercel, você precisa configurar as seguintes variáveis de ambiente no painel do Vercel:

### 1. Acesse o Painel do Vercel

- Vá para [vercel.com](https://vercel.com)
- Acesse seu projeto
- Vá para **Settings** > **Environment Variables**

### 2. Configure as Variáveis

Adicione as seguintes variáveis de ambiente:

```
NEXT_PUBLIC_FIREBASE_API_KEY=sua_api_key_aqui
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FIREBASE_VAPID_KEY=sua_vapid_key_aqui
```

### 3. Como Obter essas Configurações

1. **Acesse o Console do Firebase**: [console.firebase.google.com](https://console.firebase.google.com)
2. **Selecione seu projeto**
3. **Vá para Configurações do Projeto** (ícone de engrenagem)
4. **Na aba "Geral", role até "Seus aplicativos"**
5. **Clique em "Adicionar app" se ainda não tiver um app web**
6. **Copie as configurações do Firebase**

### 4. Configuração da Autenticação

1. **No Firebase Console, vá para Authentication**
2. **Habilite os métodos de autenticação:**
   - Google (para admin/staff)
   - Anônimo (para clientes)

### 5. Configuração do Google Auth

1. **No Firebase Console > Authentication > Sign-in method**
2. **Habilite o Google**
3. **Configure o OAuth consent screen no Google Cloud Console**
4. **Adicione os domínios autorizados:**
   - `localhost` (para desenvolvimento)
   - `seu-dominio.vercel.app` (para produção)

### 6. Deploy

Após configurar as variáveis de ambiente:

1. **Faça commit das mudanças**
2. **Push para o repositório**
3. **O Vercel fará o deploy automaticamente**

### 7. Teste

Após o deploy, teste:

- Login com Google
- Login anônimo
- Logout
- Verificação se o usuário permanece logado

## Notas Importantes

- **Nunca commite** as chaves reais do Firebase no repositório
- Use sempre variáveis de ambiente para configurações sensíveis
- O arquivo `.env.local` é apenas para desenvolvimento local
- Em produção, o Vercel usará as variáveis configuradas no painel
