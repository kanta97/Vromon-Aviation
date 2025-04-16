/** @type {import('next').NextConfig} */
const withDotenv = require("next-runtime-dotenv");
module.exports = withDotenv({
  publicRuntimeConfig: {
    NEXT_PUBLIC_ROBOTS_TXT: process.env.NEXT_PUBLIC_ROBOTS_TXT,
  },
});
const nextConfig = {
    reactStrictMode: true,
    images: {
        unoptimized: true
    }
}

module.exports = nextConfig
