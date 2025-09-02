# Guia de Instalação - Delivery SaaS

## Passo a Passo para Configurar o Projeto

### 1. Pré-requisitos

Certifique-se de ter instalado:

- Node.js 18 ou superior
- npm ou yarn

### 2. Instalação das Dependências

Execute o seguinte comando na raiz do projeto:

```bash
npm install
```

Isso instalará todas as dependências listadas no `package.json`:

#### Dependências Principais:

- `next` - Framework React
- `react` e `react-dom` - Biblioteca React
- `bootstrap` - Framework CSS
- `@fortawesome/fontawesome-free` - Ícones

#### Dependências de Desenvolvimento:

- `typescript` - Tipagem estática
- `@types/node`, `@types/react`, `@types/react-dom` - Tipos TypeScript
- `eslint` e `eslint-config-next` - Linter

### 3. Executar o Projeto

```bash
npm run dev
```

O projeto estará disponível em: http://localhost:3000

### 4. Verificar Funcionalidades

Após a instalação, você deve conseguir:

✅ **Navegar pelas páginas:**

- Página inicial: http://localhost:3000
- Página de menu: http://localhost:3000/menu

✅ **Ver o layout responsivo:**

- Navbar com logo e links
- Footer com informações
- Design adaptável para mobile

✅ **Testar PWA:**

- Abrir DevTools > Application > Service Workers
- Verificar se o service worker está registrado
- Testar funcionalidade offline

### 5. Estrutura de Arquivos Criada

```
delivery-saas/
├── public/
│   ├── icons/icon.svg      # Ícone do PWA
│   ├── manifest.json       # Configuração PWA
│   └── sw.js              # Service Worker
├── src/
│   ├── app/
│   │   ├── globals.css     # Estilos globais
│   │   ├── layout.tsx      # Layout principal
│   │   ├── page.tsx        # Página inicial
│   │   └── menu/page.tsx   # Página do menu
│   └── components/
│       ├── Navbar.tsx      # Componente de navegação
│       └── Footer.tsx      # Componente de rodapé
├── package.json            # Dependências e scripts
├── tsconfig.json          # Configuração TypeScript
├── next.config.js         # Configuração Next.js
└── .eslintrc.json         # Configuração ESLint
```

### 6. Scripts Disponíveis

```bash
npm run dev      # Desenvolvimento (localhost:3000)
npm run build    # Build de produção
npm run start    # Executar build de produção
npm run lint     # Verificar código com ESLint
```

### 7. Próximos Passos

Após a instalação bem-sucedida, você pode:

1. **Personalizar o design** editando `src/app/globals.css`
2. **Adicionar novas páginas** em `src/app/`
3. **Criar novos componentes** em `src/components/`
4. **Configurar Firebase** para backend
5. **Implementar autenticação** de usuários

### 8. Solução de Problemas

**Erro de dependências:**

```bash
rm -rf node_modules package-lock.json
npm install
```

**Erro de TypeScript:**

```bash
npm run build
```

**Erro de ESLint:**

```bash
npm run lint
```

---

🎉 **Parabéns!** Seu projeto Delivery SaaS está configurado e pronto para desenvolvimento!
