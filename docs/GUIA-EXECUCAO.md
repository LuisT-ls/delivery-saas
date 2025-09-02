# Guia de Execução Rápida - Páginas Públicas do Restaurante

Este guia mostra como executar e testar as páginas públicas do restaurante implementadas.

## 🚀 Passos para Execução

### 1. Configurar Variáveis de Ambiente

Copie o arquivo de exemplo e configure suas credenciais do Firebase:

```bash
cp env.example .env.local
```

Edite o arquivo `.env.local` com suas credenciais do Firebase:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=sua_api_key_aqui
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Popular Dados de Teste

Execute o script para criar dados mock no Firestore:

```bash
npm run seed
```

**Saída esperada:**

```
🌱 Iniciando população do banco de dados...
📝 Adicionando restaurantes...
✅ Restaurante "Pizzaria Bella Italia" adicionado
✅ Restaurante "Hamburgueria Gourmet" adicionado
📝 Adicionando categorias...
✅ Categoria "Pizzas Tradicionais" adicionada
✅ Categoria "Pizzas Especiais" adicionada
✅ Categoria "Bebidas" adicionada
✅ Categoria "Hambúrgueres Clássicos" adicionada
✅ Categoria "Hambúrgueres Gourmet" adicionada
✅ Categoria "Acompanhamentos" adicionada
📝 Adicionando itens do menu...
✅ Item "Margherita" adicionado
✅ Item "Pepperoni" adicionado
✅ Item "Quatro Queijos" adicionado
✅ Item "Calabresa Especial" adicionado
✅ Item "Coca-Cola 350ml" adicionado
✅ Item "X-Burger Clássico" adicionado
✅ Item "X-Bacon" adicionado
✅ Item "Gourmet Truffle" adicionado
✅ Item "Batata Frita" adicionado
✅ Item "Onion Rings" adicionado
🎉 População do banco de dados concluída com sucesso!

📊 Resumo:
- 2 restaurantes
- 6 categorias
- 10 itens do menu

🔗 URLs de teste:
- http://localhost:3000/r/restaurant-1/menu
- http://localhost:3000/r/restaurant-2/menu
- http://localhost:3000/r/restaurant-1/item/item-1
```

### 4. Executar o Projeto

```bash
npm run dev
```

O projeto estará disponível em: http://localhost:3000

## 🧪 URLs de Teste

Após executar os passos acima, você pode testar as seguintes URLs:

### Menu dos Restaurantes

- **Pizzaria Bella Italia**: http://localhost:3000/r/restaurant-1/menu
- **Hamburgueria Gourmet**: http://localhost:3000/r/restaurant-2/menu

### Detalhes dos Itens

- **Pizza Margherita**: http://localhost:3000/r/restaurant-1/item/item-1
- **Pizza Pepperoni**: http://localhost:3000/r/restaurant-1/item/item-2
- **X-Burger Clássico**: http://localhost:3000/r/restaurant-2/item/item-6
- **Gourmet Truffle**: http://localhost:3000/r/restaurant-2/item/item-8

## 📱 Funcionalidades para Testar

### Página do Menu (`/r/[restaurantId]/menu`)

- ✅ Visualização do header do restaurante com logo e informações
- ✅ Banner do restaurante (quando disponível)
- ✅ Lista de categorias organizadas
- ✅ Cards dos produtos com imagens, preços e descrições
- ✅ Links para páginas de detalhes dos itens
- ✅ Footer com informações de contato
- ✅ Design responsivo (teste em diferentes tamanhos de tela)

### Página de Detalhes do Item (`/r/[restaurantId]/item/[itemId]`)

- ✅ Header com navegação de volta ao menu
- ✅ Imagem grande do produto
- ✅ Informações detalhadas (nome, categoria, preço, descrição)
- ✅ Status de disponibilidade
- ✅ Botões de ação (Adicionar ao Carrinho, Favoritar)
- ✅ Informações do restaurante
- ✅ Navegação de volta ao menu completo

## 🔧 Estrutura de Dados Criada

### Restaurantes

1. **Pizzaria Bella Italia** (ID: restaurant-1)

   - 3 categorias: Pizzas Tradicionais, Pizzas Especiais, Bebidas
   - 5 itens no menu

2. **Hamburgueria Gourmet** (ID: restaurant-2)
   - 3 categorias: Hambúrgueres Clássicos, Hambúrgueres Gourmet, Acompanhamentos
   - 5 itens no menu

### Itens de Exemplo

- **Pizzas**: Margherita (R$ 35,90), Pepperoni (R$ 42,90), Quatro Queijos (R$ 48,90)
- **Hambúrgueres**: X-Burger Clássico (R$ 28,90), X-Bacon (R$ 32,90), Gourmet Truffle (R$ 65,90)
- **Acompanhamentos**: Batata Frita (R$ 15,90), Onion Rings (R$ 18,90)
- **Bebidas**: Coca-Cola 350ml (R$ 6,90)

## 🐛 Solução de Problemas

### Erro de Conexão com Firebase

- Verifique se as variáveis de ambiente estão configuradas corretamente
- Confirme se o projeto Firebase está ativo
- Verifique se as regras do Firestore permitem leitura

### Páginas não Carregam

- Execute `npm run seed` para garantir que os dados existem
- Verifique o console do navegador para erros
- Confirme se o servidor está rodando em http://localhost:3000

### Imagens não Aparecem

- As imagens são do Unsplash e dependem de conexão com internet
- Verifique se há bloqueadores de conteúdo
- As imagens têm fallback para ícones quando não carregam

## 📋 Checklist de Testes

- [ ] Página do menu carrega corretamente
- [ ] Imagens dos produtos são exibidas
- [ ] Preços estão formatados em Real (R$)
- [ ] Links para detalhes dos itens funcionam
- [ ] Página de detalhes do item carrega
- [ ] Navegação entre páginas funciona
- [ ] Design responsivo em mobile
- [ ] Páginas de erro são exibidas corretamente
- [ ] Páginas de loading são exibidas durante carregamento

## 🎯 Próximos Passos

Após testar as funcionalidades básicas, você pode implementar:

1. **Sistema de Carrinho**: Adicionar itens ao carrinho
2. **Finalização de Pedidos**: Fluxo completo de checkout
3. **Filtros e Busca**: Buscar itens por nome ou categoria
4. **Avaliações**: Sistema de comentários e avaliações
5. **Favoritos**: Salvar itens favoritos
6. **Notificações**: Alertas para pedidos

## 📞 Suporte

Se encontrar problemas, verifique:

1. Console do navegador para erros JavaScript
2. Console do terminal para erros do servidor
3. Regras do Firestore para permissões
4. Configuração das variáveis de ambiente
