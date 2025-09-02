const { execSync } = require('child_process')

console.log('🧪 Testando build do projeto...')

try {
  // Verificar se o TypeScript compila
  console.log('📝 Verificando TypeScript...')
  execSync('npx tsc --noEmit', { stdio: 'inherit' })
  console.log('✅ TypeScript OK')

  // Verificar se o ESLint passa
  console.log('🔍 Verificando ESLint...')
  execSync('npm run lint', { stdio: 'inherit' })
  console.log('✅ ESLint OK')

  console.log('🎉 Todos os testes passaram! O projeto está pronto para deploy.')
} catch (error) {
  console.error('❌ Erro nos testes:', error.message)
  process.exit(1)
}
