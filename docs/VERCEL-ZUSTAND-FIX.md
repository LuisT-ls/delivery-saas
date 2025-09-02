# 🔧 Fix para Zustand no Vercel

Este arquivo contém as instruções para resolver o problema de deploy do Zustand no Vercel.

## 🚨 Problema

O erro `Module not found: Can't resolve 'zustand'` ocorre durante o build no Vercel porque a dependência não está sendo instalada corretamente.

## ✅ Soluções

### 1. Verificar package.json

Certifique-se de que o Zustand está listado nas dependências:

```json
{
  "dependencies": {
    "zustand": "^4.4.7"
  }
}
```

### 2. Forçar Reinstalação

No painel do Vercel:

1. Vá para **Settings > General**
2. Clique em **Clear Build Cache**
3. Faça um novo deploy

### 3. Configurar Variáveis de Ambiente

No painel do Vercel, adicione:

```
NPM_FLAGS=--legacy-peer-deps
```

### 4. Usar Script de Build Personalizado

Se o problema persistir, use o script `vercel-build.js`:

```json
{
  "buildCommand": "node vercel-build.js"
}
```

### 5. Verificar .vercelignore

Certifique-se de que o `.vercelignore` não está ignorando arquivos importantes:

```gitignore
# NÃO ignorar
package.json
package-lock.json
```

### 6. Forçar Instalação Manual

No painel do Vercel, configure:

**Build Command:**

```bash
npm install zustand && npm run build
```

## 🔍 Debug

Para debugar, adicione logs no build:

```bash
npm list zustand
npm run build
```

## 📞 Suporte

Se o problema persistir:

1. Verifique os logs completos no Vercel
2. Teste localmente com `npm run build`
3. Verifique se há conflitos de versão

## ✅ Checklist

- [ ] Zustand está no package.json
- [ ] package-lock.json existe
- [ ] .vercelignore não ignora arquivos importantes
- [ ] Cache do Vercel foi limpo
- [ ] Build local funciona
