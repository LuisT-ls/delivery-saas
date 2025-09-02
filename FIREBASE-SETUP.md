# Configuração do Firebase

Este documento explica como configurar e usar o Firebase no projeto Delivery SaaS.

## 📋 Pré-requisitos

- Conta no Google Firebase
- Projeto Firebase criado
- Node.js e npm instalados

## 🔧 Instalação

### 1. Instalar Dependências

```bash
npm install firebase
```

### 2. Configurar Variáveis de Ambiente

Copie o arquivo de exemplo e configure suas variáveis:

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

## 🏗️ Estrutura dos Arquivos

```
src/lib/
├── firebase.ts      # Configuração principal do Firebase
├── auth.ts          # Helper de autenticação
└── auth-example.tsx # Exemplo de uso
```

## 🔐 Autenticação

### Login com Google (Admin/Staff)

```typescript
import { signInWithGoogle } from '@/lib/auth'

const handleLogin = async () => {
  try {
    const result = await signInWithGoogle()
    console.log('Usuário logado:', result.user)
  } catch (error) {
    console.error('Erro no login:', error)
  }
}
```

### Login Anônimo (Clientes)

```typescript
import { signInAnonymouslyUser } from '@/lib/auth'

const handleAnonymousLogin = async () => {
  try {
    const result = await signInAnonymouslyUser()
    console.log('Usuário anônimo logado:', result.user)
  } catch (error) {
    console.error('Erro no login anônimo:', error)
  }
}
```

### Logout

```typescript
import { signOutUser } from '@/lib/auth'

const handleLogout = async () => {
  try {
    await signOutUser()
    console.log('Usuário deslogado')
  } catch (error) {
    console.error('Erro no logout:', error)
  }
}
```

### Listener de Estado de Autenticação

```typescript
import { onAuthStateChange } from '@/lib/auth'
import { useEffect } from 'react'

function MyComponent() {
  useEffect(() => {
    const unsubscribe = onAuthStateChange(user => {
      if (user) {
        console.log('Usuário logado:', user)
      } else {
        console.log('Usuário deslogado')
      }
    })

    return () => unsubscribe()
  }, [])

  return <div>Meu Componente</div>
}
```

## 🗄️ Firestore

### Importar Firestore

```typescript
import { db } from '@/lib/firebase'
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'
```

### Exemplo de Uso

```typescript
// Adicionar documento
const addOrder = async orderData => {
  try {
    const docRef = await addDoc(collection(db, 'orders'), orderData)
    console.log('Pedido criado com ID:', docRef.id)
  } catch (error) {
    console.error('Erro ao criar pedido:', error)
  }
}

// Buscar documentos
const getOrders = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'orders'))
    const orders = []
    querySnapshot.forEach(doc => {
      orders.push({ id: doc.id, ...doc.data() })
    })
    return orders
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error)
  }
}
```

## 📁 Storage

### Importar Storage

```typescript
import { storage } from '@/lib/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
```

### Exemplo de Upload

```typescript
const uploadImage = async file => {
  try {
    const storageRef = ref(storage, `images/${file.name}`)
    const snapshot = await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(snapshot.ref)
    return downloadURL
  } catch (error) {
    console.error('Erro no upload:', error)
  }
}
```

## 🔒 Regras de Segurança

### Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Usuários podem ler seus próprios dados
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Pedidos: usuários podem criar, ler seus próprios pedidos
    match /orders/{orderId} {
      allow create: if request.auth != null;
      allow read, update: if request.auth != null &&
        (resource.data.userId == request.auth.uid ||
         request.auth.token.admin == true);
    }

    // Produtos: todos podem ler
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

### Storage Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Imagens de produtos: todos podem ler, admin pode escrever
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }

    // Imagens de perfil: usuários podem gerenciar suas próprias
    match /profiles/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 🚀 Deploy

### Variáveis de Ambiente no Vercel

Configure as seguintes variáveis no painel do Vercel:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

### Domínios Autorizados

No Firebase Console, adicione seus domínios de produção:

1. Vá para **Authentication > Settings > Authorized domains**
2. Adicione seu domínio (ex: `seu-app.vercel.app`)

## 🐛 Troubleshooting

### Erro: "Firebase App named '[DEFAULT]' already exists"

Este erro ocorre quando o Firebase é inicializado múltiplas vezes. A configuração atual já trata isso:

```typescript
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
```

### Erro: "Missing or insufficient permissions"

Verifique as regras de segurança do Firestore e Storage.

### Erro: "auth/unauthorized-domain"

Adicione o domínio na lista de domínios autorizados no Firebase Console.

## 📚 Recursos Adicionais

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase JavaScript SDK](https://firebase.google.com/docs/web/setup)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firebase Auth Documentation](https://firebase.google.com/docs/auth)
- [Firebase Storage Documentation](https://firebase.google.com/docs/storage)
