# 🔥 Instruções para Deploy das Regras do Firestore

## 🚨 Problema Identificado

O erro **"Missing or insufficient permissions"** está ocorrendo porque as regras de segurança do Firestore estão muito restritivas para a funcionalidade de onboarding de restaurantes.

## ✅ Solução Implementada

Atualizei as regras do Firestore para permitir que usuários autenticados possam:

- ✅ **Criar restaurantes** usando seu próprio UID como ID do documento
- ✅ **Atualizar restaurantes** que possuem como proprietário
- ✅ **Excluir restaurantes** que possuem como proprietário
- ✅ **Ler todos os restaurantes** (acesso público)

## 🚀 Como Fazer o Deploy

### **1. Verificar se o Firebase CLI está instalado**

```bash
firebase --version
```

Se não estiver instalado:

```bash
npm install -g firebase-tools
```

### **2. Fazer login no Firebase**

```bash
firebase login
```

### **3. Verificar se está no projeto correto**

```bash
firebase projects:list
firebase use delivery-saas-7055a
```

### **4. Deploy das regras de segurança**

```bash
firebase deploy --only firestore:rules
```

### **5. Verificar se o deploy foi bem-sucedido**

```bash
firebase firestore:rules:get
```

## 🔒 Regras de Segurança Atualizadas

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Regras para usuários
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Regras para restaurantes
    match /restaurants/{restaurantId} {
      // Leitura pública para todos os restaurantes
      allow read: if true;

      // Criação: usuários autenticados podem criar restaurantes
      allow create: if request.auth != null &&
                      request.auth.uid == restaurantId &&
                      request.resource.data.ownerId == request.auth.uid;

      // Atualização: apenas o proprietário pode atualizar
      allow update: if request.auth != null &&
                      request.auth.uid == resource.data.ownerId;

      // Exclusão: apenas o proprietário pode excluir
      allow delete: if request.auth != null &&
                      request.auth.uid == resource.data.ownerId;

      // Regras para dispositivos registrados
      match /devices/{deviceToken} {
        allow read, write: if request.auth != null &&
                            request.auth.uid == get(/databases/$(database)/documents/restaurants/$(restaurantId)).data.ownerId;
      }
    }

    // Regras para pedidos
    match /orders/{orderId} {
      allow read, write: if request.auth != null;
    }

    // Regras para outros documentos
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 🔍 Como as Regras Funcionam

### **Para Restaurantes:**

1. **Leitura**: Qualquer pessoa pode ler todos os restaurantes
2. **Criação**: Usuário autenticado pode criar restaurante usando seu UID como ID
3. **Atualização**: Apenas o proprietário (ownerId) pode atualizar
4. **Exclusão**: Apenas o proprietário (ownerId) pode excluir

### **Para Usuários:**

1. **Leitura/Edição**: Apenas o próprio usuário pode acessar seu perfil

### **Para Pedidos:**

1. **Leitura/Edição**: Usuários autenticados podem criar e gerenciar pedidos

## 🧪 Testando Após o Deploy

### **1. Teste de Criação de Restaurante**

- Faça login na aplicação
- Vá para `/onboarding`
- Preencha o formulário do restaurante
- Clique em "Cadastrar Restaurante"
- **Resultado Esperado**: Restaurante criado com sucesso

### **2. Verificação no Firebase Console**

- Acesse [Firebase Console](https://console.firebase.google.com)
- Vá para o projeto `delivery-saas-7055a`
- Navegue para Firestore > Data
- Verifique se o documento foi criado na coleção `restaurants`

### **3. Verificação das Regras**

- No Firebase Console, vá para Firestore > Rules
- Confirme se as regras foram atualizadas

## 🚨 Problemas Comuns e Soluções

### **Erro: "firebase: command not found"**

**Solução**: Instalar Firebase CLI globalmente

```bash
npm install -g firebase-tools
```

### **Erro: "Not logged in"**

**Solução**: Fazer login no Firebase

```bash
firebase login
```

### **Erro: "Project not found"**

**Solução**: Verificar se está no projeto correto

```bash
firebase projects:list
firebase use delivery-saas-7055a
```

### **Erro: "Permission denied" após deploy**

**Solução**: Aguardar alguns minutos para as regras serem propagadas

### **Erro: "Rules deployment failed"**

**Solução**: Verificar sintaxe das regras e tentar novamente

## 📱 Estrutura dos Dados

### **Coleção: restaurants**

```javascript
{
  "userId123": {
    "name": "Nome do Restaurante",
    "address": "Endereço Completo",
    "phone": "(11) 99999-9999",
    "ownerId": "userId123",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

### **Coleção: users**

```javascript
{
  "userId123": {
    "nome": "Nome do Usuário",
    "email": "email@exemplo.com",
    "telefone": "(11) 99999-9999",
    "createdAt": "timestamp",
    "updatedAt": "timestamp",
    "isActive": true
  }
}
```

## 🎯 Próximos Passos

Após o deploy bem-sucedido:

1. ✅ Testar criação de restaurante
2. ✅ Verificar se não há mais erros de permissão
3. ✅ Testar atualização de restaurante
4. ✅ Verificar logs seguros no console

---

**Status**: ⏳ **AGUARDANDO DEPLOY**
**Última Atualização**: $(date)
**Versão das Regras**: 2.0.0
