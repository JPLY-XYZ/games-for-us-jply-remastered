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
      }, {
        protocol: 'https',
        hostname: 'cdn1.epicgames.com',
      }
    ],
  },


};

export default nextConfig;
