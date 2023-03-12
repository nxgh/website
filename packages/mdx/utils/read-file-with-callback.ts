import fs from 'fs'
import path from 'path'

import { isMd } from './utils'

export type CallbackParams = { dir: string; filename: string; __path: string; [key: string]: any }
type EmptyType = null | undefined | void | false

export default function readFileWithCallback<T extends {}>(
  dir: string,
  fn?: (params: { dir: string; filename: string; __path: string }) => Partial<CallbackParams & T> | EmptyType
) {
  let arr: Partial<CallbackParams | (CallbackParams & T)>[] = []
  const _fn = (dir: string) => {
    const PATH = path.join(process.cwd(), dir)
    fs.readdirSync(PATH, { withFileTypes: true }).forEach(i => {
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
