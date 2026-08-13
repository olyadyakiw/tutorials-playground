/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.ufs.sh',
                port: '',
                pathname: '/f/**',
            },
            {
                protocol: 'https',
                hostname: 'utfs.io',
                port: '',
                pathname: '/f/**',
            },
        ],
    },
    webpack: config => {
        config.module.rules.push({
            test: /\.mjs$/,
            include: /node_modules/,
            type: 'javascript/auto',
        })

        return config
    },
}

module.exports = nextConfig
