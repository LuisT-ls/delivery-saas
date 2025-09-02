# 🔧 Fix para Resolução de Módulos no Vercel

Este arquivo contém as instruções para resolver o problema de resolução de módulos com alias `@/` no Vercel.

## 🚨 Problema

O erro `Module not found: Can't resolve '@/lib/cart-store'` ocorre durante o build no Vercel porque o alias `@/` não está sendo reconhecido.

## ✅ Soluções Implementadas

### 1. Configuração do TypeScript (tsconfig.json)

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### 2. Configuração do JavaScript (jsconfig.json)

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### 3. Configuração do Webpack (next.config.js)

```javascript
webpack: (config, { isServer }) => {
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': require('path').resolve(__dirname, 'src')
  }
  return config
}
```

### 4. Verificação de Arquivos

O script `vercel-build.js` verifica se todos os arquivos necessários existem:

- `src/lib/cart-store.ts`
- `src/lib/orders.ts`
- `src/components/Navbar.tsx`
- `src/components/Footer.tsx`

## 🔍 Debug

### Verificar Estrutura de Pastas

```bash
# Verificar se os arquivos existem
ls -la src/lib/
ls -la src/components/
```

### Verificar Imports

```typescript
// ✅ Correto
import { useCartStore } from '@/lib/cart-store'

// ❌ Incorreto
import { useCartStore } from '../../lib/cart-store'
```

## 📋 Checklist

- [x] tsconfig.json configurado com paths
- [x] jsconfig.json criado
- [x] next.config.js com alias do webpack
- [x] Todos os arquivos existem na estrutura correta
- [x] Imports usando `@/` em vez de caminhos relativos

## 🚀 Próximos Passos

1. **Commit das mudanças**:

   ```bash
   git add .
   git commit -m "Fix: Configurar resolução de módulos para Vercel"
   git push
   ```

2. **No painel do Vercel**:

   - Vá para **Settings > General**
   - Clique em **Clear Build Cache**
   - Faça um novo deploy

3. **Se o problema persistir**:
   - Use o script `vercel-build.js` que foi criado
   - Verifique os logs completos no Vercel

## 📞 Suporte

Se o problema persistir:

1. Verifique se todos os arquivos foram commitados
2. Teste localmente com `npm run build`
3. Verifique se há erros de sintaxe nos arquivos TypeScript
4. Confirme que a estrutura de pastas está correta

## ✅ Arquivos Verificados

- [x] `src/lib/cart-store.ts`
- [x] `src/lib/orders.ts`
- [x] `src/components/Navbar.tsx`
- [x] `src/components/Footer.tsx`
- [x] `tsconfig.json`
- [x] `next.config.js`
