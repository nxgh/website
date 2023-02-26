import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

export interface FileReturnType {
  title: string
  dir: string
  content: string
  desc: string
  meta: Record<string, any>
}

const fileEndWith = (filename: string, type: string[]) => type.some((i) => filename.endsWith(i))
const isMd = (filename: string) => fileEndWith(filename, ['.md', '.mdx'])

export const commentsReg = /^<!--.*\r?\n([\s\S]*?)-->/

export function commentFilter(content: string) {
  return content.replace(commentsReg, '')
}

export function filterMeta(content: string) {
  let meta: any = {}
  const str = content.startsWith('<!--') && content.match(commentsReg) ? content.match(commentsReg)![1] : ''
  try {
    meta = yaml.load(str) || {}
  } catch (error) {
    console.log(error)
  }
  return meta
}

type B = { dir: string; filename: string; __path: string; [key: string]: any }
type EmptyType = null | undefined | void | false

export function readFileFn(dir: string, fn?: (params: B) => Partial<B> | EmptyType) {
  let arr: Partial<B>[] = []
  const _fn = (dir: string) => {
    const PATH = path.join(process.cwd(), dir)
    fs.readdirSync(PATH, { withFileTypes: true }).forEach((i) => {
      if ((i.isFile() && !isMd(i.name)) || i.name.startsWith('.')) return
      if (i.isDirectory()) {
        return _fn(`${dir}/${i.name}`)
      }
      if (fn) {
        const result = fn({ dir, __path: PATH, filename: i.name })
        if (result) arr.push(result)
        return
      }
      arr.push({
        dir,
        filename: i.name,
        __path: PATH,
      })
    })
  }
  _fn(dir)
  return arr
}
