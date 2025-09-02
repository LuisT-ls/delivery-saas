# Solução Definitiva - Erro de Deploy no Vercel

## Problema Identificado

O erro persiste porque o Vercel ainda está usando a versão antiga do Next.js (14.0.4) e o módulo `undici` está causando conflitos de compatibilidade.

## Soluções Implementadas

### 1. **Versão do Node.js**

- Mudança de Node.js 22.x para 18.x (mais estável)
- Arquivo `.nvmrc` criado para forçar versão específica

### 2. **Firebase Otimizado**

- Criado `firebase-client.ts` sem Storage
- Storage removido do bundle do cliente
- Apenas Firestore e Auth são carregados

### 3. **Configuração do Webpack**

- Exclusão de módulos problemáticos do bundle
- Fallbacks para módulos Node.js
- Transpilação específica

### 4. **Script de Build Personalizado**

- `vercel-build.sh` com limpeza completa
- Força reinstalação de dependências
- Build otimizado para produção

### 5. **Resolução de Dependências**

- Versão específica do `undici` (5.28.3)
- Configuração de `resolutions` no package.json

## Passos para Deploy

### 1. **Commit das Alterações**

```bash
git add .
git commit -m "Fix: Solução definitiva para deploy no Vercel"
git push
```

### 2. **No Painel do Vercel**

- Vá para Settings > General
- Clique em "Clear Build Cache"
- Configure as variáveis de ambiente

### 3. **Variáveis de Ambiente Necessárias**

```env
NEXT_PUBLIC_FIREBASE_API_KEY=sua_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

### 4. **Configurações do Build**

- **Framework**: Next.js
- **Build Command**: `chmod +x vercel-build.sh && ./vercel-build.sh`
- **Install Command**: `npm install`
- **Output Directory**: `.next`

## Teste Local

Antes do deploy, teste localmente:

```bash
# Limpar tudo
npm run clean

# Instalar dependências
npm install

# Build
npm run build

# Testar produção
npm start
```

## Monitoramento

Após o deploy:

1. **Verifique os logs** no Vercel
2. **Teste as URLs**:
   - `https://seu-projeto.vercel.app/r/restaurant-1/menu`
   - `https://seu-projeto.vercel.app/r/restaurant-1/item/item-1`

## Se o Problema Persistir

### Opção 1: Deploy Manual

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Opção 2: Build Local + Deploy

```bash
# Build local
npm run build:clean

# Deploy apenas os arquivos buildados
vercel --prod --prebuilt
```

### Opção 3: Usar Vercel com Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Arquivos Modificados

- `package.json` - Versões e scripts
- `next.config.js` - Configuração do webpack
- `src/lib/firebase-client.ts` - Firebase sem Storage
- `src/lib/restaurant-data.ts` - Import atualizado
- `vercel.json` - Configuração do deploy
- `vercel-build.sh` - Script de build
- `.nvmrc` - Versão do Node.js
- `.vercelignore` - Arquivos ignorados

## Suporte

Se ainda houver problemas:

1. Verifique se todas as variáveis de ambiente estão configuradas
2. Confirme se o projeto Firebase está ativo
3. Teste localmente com `npm run build:clean`
4. Verifique os logs completos no Vercel
