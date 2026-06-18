import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["@eduba/ui"],
  outputFileTracingRoot: __dirname + "/../..",
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default withMDX(nextConfig);
