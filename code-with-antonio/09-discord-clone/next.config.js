/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: config => {
        config.externals.push({
            'utf-8-validate': 'commonjs utf-8-validate',
            bufferutil: 'commonjs',
        })

        return config
    },
    images: {
        domains: ['y47b5s59g1.ufs.sh', 'utfs.io'],
    },
}

module.exports = nextConfig
