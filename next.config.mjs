import { remarkCodeHike } from '@code-hike/mdx'
import theme from "shiki/themes/github-dark.json" assert { type: "json" }

import remarkGfm from 'remark-gfm'
import nextMdx from '@next/mdx';
import stringWidth from 'string-width'

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

    return config;
  },
})

