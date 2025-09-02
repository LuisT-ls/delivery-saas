#!/bin/bash

# Script de build específico para o Vercel
echo "🚀 Iniciando build no Vercel..."

# Limpar cache
echo "🧹 Limpando cache..."
rm -rf .next
rm -rf node_modules/.cache

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

# Build do projeto
echo "🔨 Executando build..."
npm run build

echo "✅ Build concluído!"
