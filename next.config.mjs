/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable source maps for better debugging
  productionBrowserSourceMaps: false,
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.devtool = isServer ? 'source-map' : 'eval-source-map';
    }
    return config;
  },
};

export default nextConfig;
