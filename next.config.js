/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
  
  sassOptions: {
    includePaths: [path.join(__dirname, "./src/styles")],
  },
  

  /*
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@styles': path.resolve(__dirname, './src/styles'),
    };

    return config;
  },
  */
}

module.exports = nextConfig
