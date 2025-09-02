# Atualização para Node.js 22 - Vercel

## Problema Identificado

O Vercel agora exige Node.js 22.x e não aceita mais a versão 18.x:

```
Error: Node.js Version "18.x" is discontinued and must be upgraded.
Please set "engines": { "node": "22.x" } in your `package.json` file to use Node.js 22.
```

## Soluções Implementadas

### 1. **Atualização do package.json**

```json
{
  "engines": {
    "node": "22.x"
  }
}
```

### 2. **Atualização do .nvmrc**

```
22.19.0
```

### 3. **Simplificação do Build**

- Removido script complexo de build
- Usando `npm run build` padrão
- Configuração otimizada para Node.js 22

## Compatibilidade

### ✅ **Funcionalidades Mantidas**

- Firebase Firestore
- Next.js 14.1.0
- Bootstrap 5.3.2
- TypeScript
- Server Components

### 🔧 **Otimizações para Node.js 22**

- Webpack configurado para compatibilidade
- Fallbacks para módulos Node.js
- Transpilação específica do Firebase

## Teste Local

Para testar com Node.js 22:

```bash
# Instalar Node.js 22 (se necessário)
nvm install 22.19.0
nvm use 22.19.0

# Limpar e instalar
npm run clean
npm install

# Build e teste
npm run build
npm start
```

## Deploy

Após as alterações:

1. **Commit e push**:

   ```bash
   git add .
   git commit -m "Fix: Atualizar para Node.js 22.x"
   git push
   ```

2. **Configurar variáveis de ambiente** no Vercel (se ainda não fez)

3. **Deploy automático** será executado

## Verificação

Após o deploy bem-sucedido:

- ✅ Node.js 22.x será usado
- ✅ Build sem erros de versão
- ✅ Aplicação funcionando normalmente

## Troubleshooting

### Se houver problemas com Node.js 22:

1. **Verificar versão local**:

   ```bash
   node --version
   # Deve mostrar v22.x.x
   ```

2. **Limpar cache**:

   ```bash
   npm run clean
   rm -rf node_modules
   npm install
   ```

3. **Testar build local**:
   ```bash
   npm run build
   ```

### Se ainda houver erros:

1. Verificar se todas as variáveis de ambiente estão configuradas
2. Confirmar se o projeto Firebase está ativo
3. Verificar os logs completos no Vercel
