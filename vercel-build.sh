#!/bin/bash

# Script de build personalizado para o Vercel
echo "🔧 Iniciando build personalizado..."

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

# Verificar se o Zustand foi instalado
if ! npm list zustand; then
    echo "⚠️  Zustand não encontrado, instalando..."
    npm install zustand@^4.4.7 --save
fi

# Executar build
echo "🏗️  Executando build..."
npm run build

echo "✅ Build concluído!"
