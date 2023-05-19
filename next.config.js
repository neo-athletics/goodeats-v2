/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**.yelpcdn.com",
            },
        ],
    },
    experimental: {
        appDir: true,
    },
};

module.exports = nextConfig;
