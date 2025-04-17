/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '*.googleusercontent.com',
          },
          {
            protocol: 'https',
            hostname: 'cdn.discordapp.com',
          },
          {
            protocol: 'https',
            hostname: 'plus.unsplash.com',
          }
        ],
      },


};

export default nextConfig;
