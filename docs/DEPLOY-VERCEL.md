# Deploy no Vercel - Solução de Problemas

Este documento contém as soluções para problemas comuns de deploy no Vercel.

## Problema: Erro de Compilação com Firebase

### Erro Original

```
Module parse failed: Unexpected token (682:63)
File was processed with these loaders:
./node_modules/undici/lib/web/fetch/util.js
```

### Soluções Implementadas

#### 1. Atualização do Next.js

- Atualizado de `14.0.4` para `14.1.0`
- Versões mais recentes têm melhor compatibilidade com Firebase

#### 2. Configuração do Webpack

- Adicionados fallbacks para módulos Node.js
- Configurado para ignorar warnings do Firebase
- Transpilação específica do `@firebase/storage`

#### 3. Modificação do Firebase

- Removida inicialização automática do Storage
- Storage agora é carregado dinamicamente apenas quando necessário

#### 4. Configuração do Vercel

- Arquivo `vercel.json` com configurações específicas
- Timeout aumentado para funções serverless

## Passos para Deploy

### 1. Configurar Variáveis de Ambiente no Vercel

No painel do Vercel, adicione as seguintes variáveis de ambiente:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=sua_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

### 2. Configurar Build Settings

No painel do Vercel, configure:

- **Framework Preset**: Next.js
- **Build Command**: `npm run build:clean`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 3. Configurar Regras do Firestore

Certifique-se de que as regras do Firestore permitem leitura pública:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir leitura pública para restaurantes
    match /restaurants/{restaurantId} {
      allow read: if true;
    }

    // Permitir leitura pública para categorias
    match /categories/{categoryId} {
      allow read: if true;
    }

    // Permitir leitura pública para itens do menu
    match /menu_items/{itemId} {
      allow read: if true;
    }
  }
}
```

## Comandos Úteis

### Limpar Cache Local

```bash
npm run clean
```

### Build com Limpeza

```bash
npm run build:clean
```

### Testar Build Localmente

```bash
npm run build
npm start
```

## Troubleshooting

### Se o erro persistir:

1. **Limpar cache do Vercel**:

   - Vá para o projeto no Vercel
   - Settings > General > Clear Build Cache

2. **Forçar rebuild**:

   - Faça um commit vazio ou force push

3. **Verificar logs**:

   - Monitore os logs de build no Vercel
   - Verifique se todas as variáveis de ambiente estão configuradas

4. **Testar localmente**:
   ```bash
   npm run build:clean
   npm start
   ```

### Problemas Comuns

#### Erro de Variáveis de Ambiente

- Verifique se todas as variáveis estão configuradas no Vercel
- Certifique-se de que os nomes estão corretos (NEXT*PUBLIC*\*)

#### Erro de Timeout

- As funções serverless têm timeout de 30 segundos
- Se necessário, aumente o timeout no `vercel.json`

#### Erro de Dependências

- Execute `npm install` localmente para verificar conflitos
- Use `npm audit fix` para resolver vulnerabilidades

## Monitoramento

Após o deploy bem-sucedido:

1. **Teste as URLs**:

   - `https://seu-projeto.vercel.app/r/restaurant-1/menu`
   - `https://seu-projeto.vercel.app/r/restaurant-1/item/item-1`

2. **Verifique logs**:

   - Monitore os logs de função no Vercel
   - Verifique se não há erros de conexão com Firebase

3. **Teste funcionalidades**:
   - Navegação entre páginas
   - Carregamento de imagens
   - Formatação de preços

## Suporte

Se ainda houver problemas:

1. Verifique os logs completos no Vercel
2. Teste localmente com `npm run build:clean`
3. Verifique se o projeto Firebase está ativo
4. Confirme se as regras do Firestore permitem leitura
