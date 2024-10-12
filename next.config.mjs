/**
 * @type {import('next').NextConfig}
 */

const isStaticExport = 'false';

const nextConfig = {
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  env: {
    BUILD_STATIC_EXPORT: isStaticExport,
  },
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/lab': {
      transform: '@mui/lab/{{member}}',
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  ...(isStaticExport === 'true' && {
    output: 'export',
  }),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'getswing.s3.ap-southeast-1.amazonaws.com', // Replace with your external domain
        port: '',
        pathname: '/**', // Path for the images, wildcard for all subpaths
      },
    ],
  },
};

export default nextConfig;
