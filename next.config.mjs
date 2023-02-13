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
    config.resolve.fallback = { fs: false, path: false };

    config.plugins.push(UnoCSS());

    // if (context.buildId !== "development") {
    //   // * disable filesystem cache for build
    //   // * https://github.com/unocss/unocss/issues/419
    //   // * https://webpack.js.org/configuration/cache/
    //   config.cache = false;
    // }

    return config;
  },
})

