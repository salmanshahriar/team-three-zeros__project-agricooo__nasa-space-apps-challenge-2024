import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const withPWAConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

export default withPWAConfig(nextConfig);
