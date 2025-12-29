/** @type {import('next').NextConfig} */
const nextConfig = {
 images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "consummately-obsessive-alene.ngrok-free.dev",
        // port: "8000",
        pathname: "/uploads/**",
      }
    ],
  },
};

export default nextConfig;
