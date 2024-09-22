/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  i18n: {
    locales: ['en', 'pl'],
    defaultLocale: 'en'
  },
  compiler: {
    styledComponents: true
  }
}

module.exports = nextConfig
