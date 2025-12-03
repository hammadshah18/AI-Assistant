/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.cache = false; // remove Webpack snapshot warning
    return config;
  },
};

module.exports = nextConfig;
