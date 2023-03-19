import { remarkCodeHike } from '@code-hike/mdx';
import theme from "shiki/themes/github-dark.json" assert { type: "json" };

import nextMdx from '@next/mdx';
import remarkGfm from 'remark-gfm';
import stringWidth from 'string-width';
import WindiCSSWebpackPlugin from 'windicss-webpack-plugin'


const withMDX = nextMdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [[remarkGfm, { stringLength: stringWidth }], [remarkCodeHike, { theme, lineNumbers: true }],],
    rehypePlugins: [],
  },
})

export default withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],

  images: {
    unoptimized: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.plugins.push(new WindiCSSWebpackPlugin())

    config.resolve.fallback = { fs: false };


    config.module.rules.push({
      test: /\.tsx?$/,
      loader: 'esbuild-loader',
      options: {
        loader: 'tsx', // Or 'ts' if you don't need tsx
        target: 'es2015'
      }
    })

    return config;
  },
})

