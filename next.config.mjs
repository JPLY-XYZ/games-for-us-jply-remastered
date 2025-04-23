/** @type {import('next').NextConfig} */
const nextConfig = {

  images: { 
    domains: ['placehold.co'],  // Permite cargar imágenes de placehold.co
    dangerouslyAllowSVG: true,  // Habilita el soporte para SVG
  
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
      }, {
        protocol: 'https',
        hostname: 'placehold.co',
      }
    ],
  },


};

export default nextConfig;
