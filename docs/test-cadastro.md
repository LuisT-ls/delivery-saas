# Teste da Funcionalidade de Cadastro

## 🧪 Checklist de Testes

### ✅ **Teste 1: Validação de Campos Vazios**

- [ ] Deixar todos os campos vazios
- [ ] Clicar em "Criar Conta"
- [ ] **Resultado Esperado**: Mensagens de erro para todos os campos obrigatórios
- [ ] **Resultado Esperado**: Botão deve estar desabilitado

### ✅ **Teste 2: Validação de Email**

- [ ] Preencher nome e telefone
- [ ] Inserir email inválido (ex: "emailinvalido")
- [ ] **Resultado Esperado**: Mensagem "Email inválido. Verifique o formato."

### ✅ **Teste 3: Validação de Telefone**

- [ ] Preencher nome e email
- [ ] Inserir telefone em formato incorreto (ex: "11999887766")
- [ ] **Resultado Esperado**: Mensagem "Telefone deve estar no formato (71) 99999-9999"

### ✅ **Teste 4: Validação de Senha**

- [ ] Preencher todos os campos exceto senha
- [ ] Inserir senha com menos de 6 caracteres (ex: "123")
- [ ] **Resultado Esperado**: Mensagem "Senha deve ter pelo menos 6 caracteres"

### ✅ **Teste 5: Confirmação de Senha**

- [ ] Preencher todos os campos
- [ ] Inserir senhas diferentes
- [ ] **Resultado Esperado**: Mensagem "Senhas não coincidem"

### ✅ **Teste 6: Máscara de Telefone**

- [ ] Digitar números no campo telefone
- [ ] **Resultado Esperado**: Formato automático (XX) XXXXX-XXXX
- [ ] **Exemplo**: Digitar "11999887766" deve resultar em "(11) 99998-7766"

### ✅ **Teste 7: Cadastro Bem-Sucedido**

- [ ] Preencher todos os campos corretamente:
  - Nome: "João Silva"
  - Email: "joao@teste.com"
  - Telefone: "(71) 99999-9999"
  - Senha: "senha123"
  - Confirmar Senha: "senha123"
- [ ] Marcar checkbox dos termos
- [ ] Clicar em "Criar Conta"
- [ ] **Resultado Esperado**:
  - Botão mostra "Criando conta..."
  - Conta criada no Firebase Auth
  - Perfil criado no Firestore
  - Redirecionamento para `/menu`

### ✅ **Teste 8: Tratamento de Erros**

- [ ] Tentar cadastrar com email já existente
- [ ] **Resultado Esperado**: Mensagem "Este email já está sendo usado por outra conta."
- [ ] Tentar cadastrar com senha fraca
- [ ] **Resultado Esperado**: Mensagem "A senha é muito fraca. Use pelo menos 6 caracteres."

### ✅ **Teste 9: Segurança e Logging**

- [ ] Abrir console do navegador
- [ ] Realizar tentativa de cadastro
- [ ] **Resultado Esperado**:
  - NÃO deve aparecer dados sensíveis (senha, email, telefone)
  - Deve aparecer apenas logs seguros como "[REDACTED]"
  - Logs devem mostrar apenas informações não sensíveis

### ✅ **Teste 10: Estados do Botão**

- [ ] **Desabilitado**: Quando formulário inválido
- [ ] **Carregando**: Durante processo de cadastro
- [ ] **Ativo**: Quando todos os campos são válidos

### ✅ **Teste 11: Limpeza de Erros**

- [ ] Gerar erro de validação
- [ ] Começar a digitar no campo com erro
- [ ] **Resultado Esperado**: Erro deve desaparecer automaticamente

### ✅ **Teste 12: Responsividade**

- [ ] Testar em diferentes tamanhos de tela
- [ ] **Resultado Esperado**: Formulário deve ser responsivo
- [ ] **Resultado Esperado**: Layout deve se adaptar a dispositivos móveis

## 🔍 Verificações Técnicas

### **Firebase Console**

- [ ] Verificar se a conta foi criada em Authentication > Users
- [ ] Verificar se o perfil foi criado em Firestore > users/{uid}

### **Regras de Segurança**

- [ ] Verificar se as regras do Firestore estão ativas
- [ ] Confirmar que usuários só podem acessar seu próprio perfil

### **Variáveis de Ambiente**

- [ ] Confirmar que todas as variáveis do Firebase estão configuradas
- [ ] Verificar se o projeto está conectado corretamente

## 🚨 Problemas Comuns e Soluções

### **Erro: "Cadastro com email e senha não está habilitado"**

**Solução**: Habilitar "Email/Password" no Firebase Console > Authentication > Sign-in method

### **Erro: "Permission denied" no Firestore**

**Solução**: Deploy das regras de segurança com `firebase deploy --only firestore:rules`

### **Erro: "Firebase not initialized"**

**Solução**: Verificar se as variáveis de ambiente estão configuradas corretamente

### **Formulário não valida**

**Solução**: Verificar se todos os campos têm o atributo `name` correto

## 📱 Dados de Teste

### **Usuário Válido**

```
Nome: Maria Santos
Email: maria@teste.com
Telefone: (11) 88888-7777
Senha: senha123
```

### **Usuário com Dados Inválidos**

```
Nome: A
Email: emailinvalido
Telefone: 11999887766
Senha: 123
```

## 🎯 Critérios de Aprovação

A funcionalidade será considerada **APROVADA** quando:

- [ ] Todos os testes de validação passarem
- [ ] Cadastro for criado com sucesso no Firebase
- [ ] Redirecionamento funcionar corretamente
- [ ] Nenhum dado sensível aparecer no console
- [ ] Tratamento de erros funcionar adequadamente
- [ ] Interface for responsiva e acessível

---

**Status do Teste**: ⏳ **PENDENTE**
**Testador**:
**Data**:
**Observações**:
