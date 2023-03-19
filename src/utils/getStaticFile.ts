import { MarkdownHelper } from './parse-markdown'
import readFileFn from './read-file-with-callback'

import path from 'path'
import fs from 'fs'

const replaceMdxBasename = (str: string) => str.replace(/\.mdx|\.md/, '')

const DOC_PATH = '../../notes'

export function getStaticPathsFiles() {
  const files = readFileFn(DOC_PATH, (params) => {
    return {
      title: params.filename,
    }
  })
  return files
}

export function getStaticPropsFiles() {
  const files = readFileFn(DOC_PATH, (params) => {
    const file = fs.readFileSync(path.join(params.__path, params.filename), 'utf-8')
    const markdownHelper = new MarkdownHelper(file)
    const { meta } = markdownHelper.parse_meta().get()
    return {
      dir: params.dir,
      title: replaceMdxBasename(params.filename),
      filename: params.filename,
      meta,
    }
  })
  return files
}

export function getStaticPropsFileDetail(id: string) {
  const file = readFileFn(DOC_PATH, ({ filename, __path }) => {
    if (id !== filename.replace(/\.mdx?/, '')) return null
    const file = fs.readFileSync(path.join(__path, filename), 'utf-8')
    return {
      content: file,
    }
  })

  return file[0].content
}
