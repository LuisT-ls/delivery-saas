/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  webpack: (config, { isServer }) => {
    // Resolver problemas de compatibilidade com Firebase
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false
      }
    }

    // Excluir módulos problemáticos do bundle do cliente
    config.externals = config.externals || []
    if (!isServer) {
      config.externals.push({
        undici: 'undici',
        '@firebase/storage': '@firebase/storage'
      })
    }

    // Ignorar warnings específicos do Firebase
    config.ignoreWarnings = [
      { module: /node_modules\/@firebase\/storage/ },
      { module: /node_modules\/undici/ }
    ]

    return config
  },
  // Configurações adicionais para melhorar a compatibilidade
  transpilePackages: ['@firebase/storage'],
  swcMinify: true,
  // Forçar versão específica do Node.js
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@firebase/storage']
  }
}

module.exports = nextConfig
