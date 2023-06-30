// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextTranslate = require('next-translate');

/** @type {import('next').NextConfig} */
module.exports = nextTranslate({
  eslint: {
    dirs: ['src'],
  },

  reactStrictMode: true,

  webpack(config) {
    config.module.rules.push(
      {
        test: /\.svg$/i,
        type: 'asset',
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgoConfig: {
                plugins: [
                  {
                    name: 'removeViewBox',
                    active: false,
                  },
                ],
              },
            },
          },
        ],
      }
    );

    return config;
  },

  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: process.env.API_BASE_URL + '/api/v1/:path*',
      },
      {
        source: '/sanctum/csrf-cookie',
        destination: process.env.API_BASE_URL + '/sanctum/csrf-cookie',
      },
    ];
  },
});
