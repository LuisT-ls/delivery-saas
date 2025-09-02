/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@firebase/storage', '@firebase/auth']
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
        '@firebase/storage': '@firebase/storage',
        '@firebase/auth': '@firebase/auth'
      })
    }

    // Ignorar warnings específicos do Firebase
    config.ignoreWarnings = [
      { module: /node_modules\/@firebase\/storage/ },
      { module: /node_modules\/@firebase\/auth/ },
      { module: /node_modules\/undici/ }
    ]

    // Excluir completamente o undici do bundle do cliente
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        undici: false
      }
    }

    return config
  },
  swcMinify: true
}

module.exports = nextConfig
