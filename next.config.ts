import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve images through Cloudinary (see cloudinary-loader.js). The loader
    // falls back to the original local path when the cloud name isn't set,
    // so builds without Cloudinary env still work.
    loader: "custom",
    loaderFile: "./cloudinary-loader.js",
    qualities: [75, 85, 88, 90, 92],
  },
};

export default nextConfig;
