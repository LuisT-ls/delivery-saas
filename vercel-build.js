const { execSync } = require('child_process')

console.log('🔧 Iniciando build personalizado para Vercel...')

try {
  // Instalar dependências
  console.log('📦 Instalando dependências...')
  execSync('npm install', { stdio: 'inherit' })

  // Verificar se o Zustand está instalado
  console.log('🔍 Verificando Zustand...')
  try {
    execSync('npm list zustand', { stdio: 'inherit' })
    console.log('✅ Zustand encontrado!')
  } catch (error) {
    console.log('⚠️  Zustand não encontrado, instalando...')
    execSync('npm install zustand@^4.4.7 --save', { stdio: 'inherit' })
  }

  // Executar build
  console.log('🏗️  Executando build...')
  execSync('npm run build', { stdio: 'inherit' })

  console.log('✅ Build concluído com sucesso!')
} catch (error) {
  console.error('❌ Erro durante o build:', error.message)
  process.exit(1)
}
