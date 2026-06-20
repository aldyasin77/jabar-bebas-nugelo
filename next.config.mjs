/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Tambahkan baris ini
  allowedDevOrigins: ['10.44.121.39'],
}

export default nextConfig
