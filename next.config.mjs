/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/our-story",
        permanent: true,
      },
      {
        source: "/shop",
        destination: "/editions",
        permanent: true,
      },
      {
        source: "/access",
        destination: "/request-access",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
