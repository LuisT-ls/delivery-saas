const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

console.log('🔧 Iniciando build personalizado para Vercel...')

try {
  // Verificar se os arquivos existem
  console.log('🔍 Verificando arquivos...')

  const filesToCheck = [
    'src/lib/cart-store.ts',
    'src/lib/orders.ts',
    'src/components/Navbar.tsx',
    'src/components/Footer.tsx',
    'tsconfig.json'
  ]

  filesToCheck.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`✅ ${file} existe`)
    } else {
      console.log(`❌ ${file} não existe`)
    }
  })

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

  // Verificar configuração TypeScript
  console.log('🔍 Verificando TypeScript...')
  if (fs.existsSync('tsconfig.json')) {
    const tsConfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'))
    console.log('✅ tsconfig.json encontrado')
    console.log('📋 Paths configurados:', tsConfig.compilerOptions?.paths)
  }

  // Executar build
  console.log('🏗️  Executando build...')
  execSync('npm run build', { stdio: 'inherit' })

  console.log('✅ Build concluído com sucesso!')
} catch (error) {
  console.error('❌ Erro durante o build:', error.message)
  process.exit(1)
}
