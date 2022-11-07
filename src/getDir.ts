import fs from 'fs'
import path from 'path'
// import matter from 'gray-matter'

export function getFiles(dirname: string) {
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

export async function getFile(_path: string) {
  let filenames = []
  try {
    filenames = await fs.promises.readdir(_path)
  } catch (e) {
    return undefined
  }

  const files = filenames.reduce(
    async (acc, filename) => ({
      ...acc,
      [filename]: await fs.promises.readFile(`${_path}/${filename}`, 'utf8'),
    }),
    {}
  )

  return files
}

export default getFiles
