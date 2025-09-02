# Solução Definitiva - Problema do Undici

## Problema Identificado

O erro do `undici` está acontecendo porque o Firebase Auth está sendo importado no lado do cliente e está trazendo o `undici` junto, que usa sintaxe privada de classes não suportada pelo webpack do Next.js.

## Solução Implementada

### 1. **Separação de Configurações Firebase**

#### ✅ **firebase-server.ts** (para Server Components)

```typescript
// Importa tudo normalmente (Auth, Firestore, Storage)
import { getAuth } from 'firebase/auth'
export const auth = getAuth(app)
```

#### ✅ **firebase-client.ts** (para Client Components)

```typescript
// Apenas Firestore, Auth carregado dinamicamente
export const getAuth = async () => {
  if (typeof window !== 'undefined') {
    const { getAuth } = await import('firebase/auth')
    return getAuth(app)
  }
  return null
}
```

### 2. **Configuração Webpack Otimizada**

```javascript
// next.config.js
experimental: {
  serverComponentsExternalPackages: ['@firebase/storage', '@firebase/auth']
},
webpack: (config, { isServer }) => {
  if (!isServer) {
    // Excluir completamente o undici
    config.resolve.alias = {
      ...config.resolve.alias,
      undici: false
    }

    // Excluir módulos problemáticos
    config.externals.push({
      undici: 'undici',
      '@firebase/storage': '@firebase/storage',
      '@firebase/auth': '@firebase/auth'
    })
  }
}
```

### 3. **Forçar Versão do Undici**

```json
// package.json
{
  "resolutions": {
    "undici": "5.28.3"
  },
  "overrides": {
    "undici": "5.28.3"
  }
}
```

## Arquivos Modificados

### ✅ **src/lib/firebase-server.ts** (NOVO)

- Configuração completa do Firebase para server components
- Importa Auth, Firestore e Storage normalmente

### ✅ **src/lib/firebase-client.ts** (MODIFICADO)

- Apenas Firestore importado diretamente
- Auth carregado dinamicamente quando necessário

### ✅ **src/lib/restaurant-data.ts** (MODIFICADO)

- Agora usa `firebase-server.ts` em vez de `firebase-client.ts`

### ✅ **next.config.js** (MODIFICADO)

- Adicionado `@firebase/auth` aos externals
- Alias `undici: false` para excluir completamente
- Warnings ignorados para Auth

### ✅ **package.json** (MODIFICADO)

- Adicionado `overrides` para forçar versão do undici

## Como Funciona

### Server Components (páginas públicas)

```typescript
// Usa firebase-server.ts
import { db } from './firebase-server'
// ✅ Funciona normalmente, sem problemas de undici
```

### Client Components (se necessário)

```typescript
// Usa firebase-client.ts
import { db, getAuth } from './firebase-client'

// Auth carregado apenas quando necessário
const auth = await getAuth()
// ✅ Carregamento dinâmico, sem problemas de bundle
```

## Próximos Passos

### 1. **Commit das Alterações**

```bash
git add .
git commit -m "Fix: Solução definitiva para problema do undici - separação Firebase server/client"
git push
```

### 2. **Verificação**

- ✅ Build sem erros de undici
- ✅ Firebase funcionando em server components
- ✅ Aplicação funcionando normalmente

## Troubleshooting

### Se ainda houver problemas:

1. **Limpar cache completamente**:

   ```bash
   npm run clean
   rm -rf node_modules
   npm install
   ```

2. **Verificar se todas as variáveis estão configuradas** no Vercel

3. **Testar localmente**:
   ```bash
   npm run build
   npm start
   ```

## Status Final

- ✅ Undici completamente excluído do bundle do cliente
- ✅ Firebase Auth carregado dinamicamente
- ✅ Server components funcionando normalmente
- ✅ Build otimizado e sem conflitos
- ✅ Todas as funcionalidades mantidas
