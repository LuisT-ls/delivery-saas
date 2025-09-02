# Delivery SaaS

Sistema de delivery desenvolvido em Next.js + Firebase, com PWA, suporte a múltiplos restaurantes e painel de pedidos em tempo real.

## 🚀 Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Firebase** - Backend como serviço (Firestore, Auth, Storage)
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

3. Configure as variáveis de ambiente:

```bash
cp env.example .env.local
```

Edite o arquivo `.env.local` com suas configurações do Firebase:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

4. Execute o projeto em modo de desenvolvimento:

```bash
npm run dev
```

5. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🔥 Configuração do Firebase

### 1. Criar Projeto no Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Crie um novo projeto ou use um existente
3. Ative os serviços necessários:
   - **Authentication**: Para login de usuários
   - **Firestore Database**: Para armazenar dados
   - **Storage**: Para upload de imagens

### 2. Configurar Authentication

1. No Firebase Console, vá para **Authentication > Sign-in method**
2. Ative **Google** como provedor de login
3. Configure os domínios autorizados (localhost:3000 para desenvolvimento)

### 3. Configurar Firestore

1. Vá para **Firestore Database**
2. Crie um banco de dados em modo de teste
3. Configure as regras de segurança conforme necessário

### 4. Configurar Storage

1. Vá para **Storage**
2. Inicialize o Storage
3. Configure as regras de acesso

### 5. Obter Configurações

1. No Firebase Console, vá para **Project Settings**
2. Na seção **Your apps**, clique em **Add app** e escolha **Web**
3. Copie as configurações e adicione ao arquivo `.env.local`

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
- Node.js: 22.x
- Build Command: `npm run build`
- Output Directory: `.next`

## 📁 Estrutura do Projeto

```
delivery-saas/
├── docs/               # 📚 Documentação completa do projeto
│   ├── README.md       # Índice da documentação
│   ├── INSTALACAO.md   # Guia de instalação
│   ├── FIREBASE-SETUP.md # Configuração do Firebase
│   └── ...            # Outros arquivos de documentação
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
│   ├── lib/            # Bibliotecas e configurações
│   │   ├── firebase.ts # Configuração do Firebase
│   │   └── auth.ts     # Helper de autenticação
│   └── components/     # Componentes React
│       ├── Navbar.tsx  # Navegação
│       └── Footer.tsx  # Rodapé
├── package.json
├── tsconfig.json
├── next.config.js
└── env.example         # Exemplo de variáveis de ambiente
```

## 📚 Documentação

Toda a documentação técnica do projeto está organizada na pasta [`docs/`](./docs/):

- **📖 [Índice da Documentação](./docs/README.md)** - Visão geral de todos os documentos
- **🚀 [Guia de Instalação](./docs/INSTALACAO.md)** - Configuração completa do ambiente
- **🔥 [Configuração Firebase](./docs/FIREBASE-SETUP.md)** - Setup detalhado do Firebase
- **🛠️ [Guia de Deploy](./docs/DEPLOY.md)** - Deploy em produção
- **🔧 [Correções e Soluções](./docs/)** - Soluções para problemas comuns

## 🔧 Funcionalidades Implementadas

### ✅ Base do Projeto

- [x] TypeScript configurado
- [x] Bootstrap 5 e FontAwesome instalados
- [x] Layout global com Navbar e Footer
- [x] Páginas inicial e de menu
- [x] Design responsivo

### ✅ Firebase Integration

- [x] Firebase SDK modular instalado
- [x] Configuração do Firebase (Firestore, Auth, Storage)
- [x] Helper de autenticação com Google e login anônimo
- [x] Variáveis de ambiente configuradas

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

- [ ] Sistema de autenticação implementado
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
