# Configuração do Vercel para Firebase

## Problema

O upload de imagens não está funcionando em produção porque as variáveis de ambiente do Firebase não estão configuradas no Vercel.

## Solução

Configure as seguintes variáveis de ambiente no painel do Vercel:

### 1. Acesse o Vercel Dashboard

- Vá para [vercel.com](https://vercel.com)
- Acesse seu projeto `delivery-saas-one`
- Vá para **Settings** → **Environment Variables**

### 2. Adicione as Variáveis

Adicione as seguintes variáveis de ambiente:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=delivery-saas-7055a.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=delivery-saas-7055a
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=delivery-saas-7055a.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 3. Onde Encontrar os Valores

1. Acesse o [Firebase Console](https://console.firebase.google.com)
2. Selecione o projeto `delivery-saas-7055a`
3. Vá para **Project Settings** (ícone de engrenagem)
4. Na aba **General**, role até **Your apps**
5. Clique no ícone de configuração do app web
6. Copie os valores do objeto `firebaseConfig`

### 4. Configuração no Vercel

Para cada variável:

1. **Name**: Use exatamente o nome mostrado acima
2. **Value**: Cole o valor correspondente do Firebase
3. **Environment**: Selecione **Production** (e **Preview** se desejar)
4. Clique em **Save**

### 5. Redeploy

Após configurar todas as variáveis:

1. Vá para **Deployments**
2. Clique nos três pontos do último deployment
3. Selecione **Redeploy**
4. Aguarde o deploy ser concluído

### 6. Verificação

Após o redeploy, teste o upload de imagem:

1. Acesse `/onboarding`
2. Tente fazer upload de uma imagem
3. Deve funcionar sem erros de CORS

## Variáveis Obrigatórias

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`

## Variáveis Opcionais

- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

## Nota

As variáveis que começam com `NEXT_PUBLIC_` são expostas no cliente e são necessárias para o Firebase funcionar no navegador.
