/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
        port: "",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/proxy/mp3/:filename",
        destination: "/api/proxy/mp3/:filename",
      },
    ];
  },
};

export default nextConfig;
