import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'; // Check if the environment is production

const nextConfig = {
  reactStrictMode: true,
  // Other configurations can go here
};

const withPWAConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: !isProd, // Disable PWA in development mode
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/.*\.(woff|woff2|css|js)$/, // Cache fonts, CSS, JS
      handler: 'CacheFirst',
      options: {
        cacheName: 'static-resources',
        expiration: {
          maxAgeSeconds: 60 * 60 * 24 * 30, // Cache for 30 days
        },
      },
    },
    {
      urlPattern: /^https:\/\/.*\.(png|jpg|jpeg|gif|svg)$/, // Cache image files
      handler: 'CacheFirst',
      options: {
        cacheName: 'image-cache',
        expiration: {
          maxAgeSeconds: 60 * 60 * 24 * 7, // Cache images for 7 days
        },
      },
    },
  ],
});

export default withPWAConfig(nextConfig);
