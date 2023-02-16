import { remarkCodeHike } from '@code-hike/mdx';
import theme from "shiki/themes/github-dark.json" assert { type: "json" };

import nextMdx from '@next/mdx';
import remarkGfm from 'remark-gfm';
import stringWidth from 'string-width';

import UnoCSS from "@unocss/webpack";

const withMDX = nextMdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [[remarkGfm, { stringLength: stringWidth }], [remarkCodeHike, { theme, lineNumbers: true }],],
    rehypePlugins: [],
  },
})

export default withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],


  // webpack5: true,
  webpack: (config) => {
    // config.resolve.fallback = {

    //   ...config.resolve.fallback,
    //   fs: false, path: false,
    //   'builtin-modules': false,
    //   'child_process': false,
    //   worker_threads: false,
    // };


    config.plugins.push(UnoCSS());

    config.module.rules.push({
      test: /\.tsx?$/,
      loader: 'esbuild-loader',
      options: {
        loader: 'tsx', // Or 'ts' if you don't need tsx
        target: 'es2015'
      }
    })


    // if (context.buildId !== "development") {
    //   // * disable filesystem cache for build
    //   // * https://github.com/unocss/unocss/issues/419
    //   // * https://webpack.js.org/configuration/cache/
    //   config.cache = false;
    // }

    return config;
  },
})

