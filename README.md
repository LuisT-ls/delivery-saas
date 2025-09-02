# Delivery SaaS

Sistema de delivery desenvolvido em Next.js + Firebase, com PWA, suporte a múltiplos restaurantes e painel de pedidos em tempo real.

## 🚀 Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Bootstrap 5** - Framework CSS
- **FontAwesome** - Ícones
- **PWA** - Progressive Web App com Service Worker

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn

## 🛠️ Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/delivery-saas.git
cd delivery-saas
```

2. Instale as dependências:

```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento:

```bash
npm run dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🚀 Deploy no Vercel

### Deploy Automático

1. Conecte seu repositório GitHub ao Vercel
2. O Vercel detectará automaticamente que é um projeto Next.js
3. Configure as variáveis de ambiente se necessário
4. Deploy será feito automaticamente a cada push

### Deploy Manual

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Configurações do Vercel

- Framework: Next.js
- Node.js: 18.19.0
- Build Command: `npm run build`
- Output Directory: `.next`

## 📁 Estrutura do Projeto

```
delivery-saas/
├── public/
│   ├── icons/           # Ícones do PWA
│   ├── manifest.json    # Manifesto do PWA
│   └── sw.js           # Service Worker
├── src/
│   ├── app/            # App Router do Next.js
│   │   ├── globals.css # Estilos globais
│   │   ├── layout.tsx  # Layout principal
│   │   ├── page.tsx    # Página inicial
│   │   └── menu/       # Página do cardápio
│   └── components/     # Componentes React
│       ├── Navbar.tsx  # Navegação
│       └── Footer.tsx  # Rodapé
├── package.json
├── tsconfig.json
└── next.config.js
```

## 🔧 Funcionalidades Implementadas

### ✅ Base do Projeto

- [x] TypeScript configurado
- [x] Bootstrap 5 e FontAwesome instalados
- [x] Layout global com Navbar e Footer
- [x] Páginas inicial e de menu
- [x] Design responsivo

### ✅ PWA (Progressive Web App)

- [x] Manifest.json configurado
- [x] Service Worker implementado
- [x] Precache das rotas principais (/ e /menu)
- [x] Cache First para imagens
- [x] Fallback offline para páginas públicas
- [x] Notificações push
- [x] Sincronização em background

### 🎨 Interface

- [x] Navbar com logo e links de navegação
- [x] Footer com informações e redes sociais
- [x] Página inicial com seções hero e features
- [x] Página de menu com produtos e filtros
- [x] Carrinho flutuante

## 📱 PWA Features

O projeto inclui funcionalidades completas de PWA:

- **Instalação**: Pode ser instalado como app nativo
- **Offline**: Funciona sem conexão com internet
- **Cache Inteligente**: Estratégias de cache otimizadas
- **Notificações**: Suporte a push notifications
- **Background Sync**: Sincronização em segundo plano

## 🚀 Scripts Disponíveis

```bash
npm run dev      # Executa em modo desenvolvimento
npm run build    # Gera build de produção
npm run start    # Executa build de produção
npm run lint     # Executa linter
```

## 🔮 Próximos Passos

- [ ] Integração com Firebase
- [ ] Sistema de autenticação
- [ ] Painel administrativo
- [ ] Sistema de pedidos em tempo real
- [ ] Integração com APIs de pagamento
- [ ] App mobile nativo

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor, leia as diretrizes de contribuição antes de submeter um pull request.

---

Desenvolvido com ❤️ usando Next.js e Firebase
