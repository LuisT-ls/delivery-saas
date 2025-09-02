/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'images.unsplash.com']
  },
  experimental: {
    esmExternals: 'loose'
  },
  typescript: {
    // ⚠️ Desabilitar verificação de tipos durante o build
    ignoreBuildErrors: true
  },
  eslint: {
    // ⚠️ Desabilitar linting durante o build
    ignoreDuringBuilds: true
  },
  webpack: (config, { isServer }) => {
    // Configuração para resolver módulos
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false
    }

    // Forçar resolução de módulos
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src')
    }

    return config
  }
}

module.exports = nextConfig
