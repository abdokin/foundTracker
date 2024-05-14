/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        appDir: true,
    },
    webpack: (config, { webpack }) => {
        config.experiments = {
            ...config.experiments,
            topLevelAwait: true,
        }
        config.externals.push({
            sharp: "commonjs sharp",
            canvas: "commonjs canvas",
        })
        config.plugins.push(
            new webpack.ProvidePlugin({
                Buffer: ["buffer", "Buffer"],
                process: "process/browser",
            })
        )
        return config
    },
    images: {
        remotePatterns: [
            {
                hostname: 'localhost',
            },
        ],
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '10mb',
        },
    },

};



export default nextConfig;
