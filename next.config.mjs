/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Imagens locais ficam em /public/img.
    // Quando o WooCommerce headless estiver ligado, libere o domínio do WordPress aqui:
    remotePatterns: [
      // { protocol: "https", hostname: "loja.osegredofungi.com.br" },
    ],
  },
};

export default nextConfig;
