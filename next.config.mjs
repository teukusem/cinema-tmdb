/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    AUTH_TOKEN: process.env.AUTH_TOKEN,
    BASE_URL_TMDB: process.env.BASE_URL_TMDB,
    BASE_URL_IMAGE: process.env.BASE_URL_IMAGE,
    ACC_ID: process.env.ACC_ID
  },
};

export default nextConfig;
