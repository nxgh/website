import fs from 'fs'
import path from 'path'

export default function readFile(dirname: string) {
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

export function isEndWith(filename: string, endWith: string[]) {
  return endWith.some((item) => filename.endsWith(item))
}
