import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
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
