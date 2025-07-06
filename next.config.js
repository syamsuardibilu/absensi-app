/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  // Konfigurasi allowedDevOrigins untuk mengatasi masalah CORS di development
  allowedDevOrigins: ['http://localhost:8000', 'http://127.0.0.1:8000'],
};

module.exports = nextConfig;
