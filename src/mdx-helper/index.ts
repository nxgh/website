import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import renderMDX from './renderMDX'

import { filePaths as _filePaths } from '_config'

const filePaths = Object.keys(_filePaths)

export default function _getFiles(dirname: string) {
  const postsDirectory = path.join(process.cwd(), dirname)

  const fileNames = fs.readdirSync(postsDirectory)

  const Files = fileNames
    .filter((fileNames) => fileNames.endsWith('.mdx') || fileNames.endsWith('.md'))
    .map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName)
      const filename = fileName.replace(/\.md(x?)$/, '')

      const content = fs.readFileSync(fullPath, 'utf8')

      return { filename, content }
    })

  return Files
}

function replaceSpecialSymbol(str: string) {
  return str.replaceAll(/「(.*?)」/g, '<span class="corner-bracket">「$1」</span>')
}

const getFiles = async () => {
  const files = []

  for (let index = 0; index < filePaths.length; index++) {
    const element = filePaths[index]
    const file = await _getFiles(element)
    files.push(...file.map((i) => ({ ...i, category: element.replace('/', '') })))
  }
  return files
}

export async function getStaticPropsResult(
  basePath: string,
  slug: string[],
  config: {
    toc: boolean
  } = { toc: true }
) {
  const [id] = slug! || ['']

  const files = await getFiles()

  const allPostsData: { id: string; title: string; index: number }[] = files.map((item) => ({
    id: item.filename,
    title: matter(item.content).data?.title || item.filename,
    index: matter(item.content).data?.index || Infinity,
    category: item.category,
  }))

  allPostsData.sort(({ index: indexA }, { index: indexB }) => {
    return indexA > indexB ? 1 : indexA === indexB ? 0 : -1
  })
  if (!id) {
    return {
      props: {
        previewSource: '',
        allPostsData,
        id,
      },
    }
  }
  const mdxSource = files.find((item) => item.filename === id)

  const result = await renderMDX(replaceSpecialSymbol(mdxSource?.content!), { toc: config.toc })

  return {
    props: {
      previewSource: result.code || '',
      allPostsData,
      id,
    },
  }
}

export async function getStaticPathsResult(basePath: string) {
  const files = await getFiles()
  const paths = files.map((item) => ({
    params: { slug: [item.filename] },
  }))

  return {
    paths,
    fallback: false,
  }
}

