import rehypeSlug from 'rehype-slug'
import rehypeToc from '@jsdevtools/rehype-toc'
import remarkGfm from 'remark-gfm'
import { remarkCodeHike } from '@code-hike/mdx'
import { bundleMDX } from 'mdx-bundler'
import matter from 'gray-matter'
import stringWidth from 'string-width'

interface IRenderMDXConfig {
  toc?: boolean
  files?: Record<string, string>
}

async function renderMDX(mdxSource: string, config: IRenderMDXConfig = {}): ReturnType<typeof bundleMDX> {
  const { files = {}, toc = true } = config

  const shiki = await import('shiki')
  const highlighter = await shiki.getHighlighter({
    theme: 'nord',
  })
  const loadedTheme = await import(`shiki/themes/one-dark-pro.json`).then(module => module.default)

  const frontmatter = matter(mdxSource).data

  const result = await bundleMDX({
    source: matter(mdxSource).content,
    files,
    esbuildOptions(options) {
      options.platform = 'node'
      return options
    },
    mdxOptions(options) {
      options.remarkPlugins = [
        [remarkCodeHike, { theme: loadedTheme, lineNumbers: true }],
        [remarkGfm, { stringLength: stringWidth }],
      ]
      options.rehypePlugins = toc ? [rehypeSlug, [rehypeToc as any, {}]] : []
      return options
    },
  })

  return { ...result, frontmatter }
}

export default renderMDX
