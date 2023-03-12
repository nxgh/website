import yaml from 'js-yaml'

/** 以 header 分割 markdown */
export function splitMarkdownBlockByHeader(markdown: string) {
  const lines = markdown.split(/\r?\n/g)
  const data = [['']]

  function handleLine(line: string, isOutsideCodeArea = true) {
    const isHeader = line.match(/^#+\s+(.*)/)
    if (isHeader && isHeader.input && isOutsideCodeArea) {
      data.push([isHeader.input])
    } else {
      data[data.length - 1].push(`${line}\n`)
    }
  }

  let codeArea: string[] = []
  function updateCodeArea(line: string) {
    const matchCodeArea = line.match(/^`{3,4}/)
    if (matchCodeArea && (codeArea.length === 0 || codeArea[codeArea.length - 1] !== matchCodeArea[0])) {
      codeArea.push(matchCodeArea[0])
    } else if (matchCodeArea && codeArea[codeArea.length - 1] === matchCodeArea[0]) {
      codeArea.pop()
    }
  }

  lines.forEach((line, index) => {
    line = line.trimEnd()
    updateCodeArea(line)
    handleLine(line, codeArea.length === 0)
  })

  return data
}

/** 处理分割后的 markdown 文件  */
export function splitFileBySection(file: string) {
  return splitMarkdownBlockByHeader(file)
    .map(item => {
      if (item.every(i => i === '' || i === '\n')) return ''
      // const isHeader = (str: string) => str.match(/^(#*?)\s/)?.[1].length || 0
      // if (isHeader(item[0]) === 1) {
      //   return `<section className="section" id="section-h1">\n${item.join('')}\n</section>\n`
      // }
      return `<section className="section">\n${item.join('')}\n</section>\n`
    })
    .join('')
}

export function replacePreview(file: string) {
  const regex = /<!-- <Preview\.(.*?)> -->([\s\S]*?)<!-- <\/Preview\..*?> -->/gm
  return file.replaceAll(regex, (match, p1, p2) => {
    const data: string = p2.replaceAll(/```.*?\n/g, '')
    return `<div className="ch-scroll-coding-with-preview">\n<CH.Scrollycoding>\n\n<Preview type="${p1}" data={${JSON.stringify(
      data
    )}} />\n${p2}\n</CH.Scrollycoding>\n</div>\n`
  })
}

export interface FileReturnType {
  title: string
  dir: string
  content: string
  desc: string
  meta: Record<string, any>
}

export interface FileMeta {
  tags?: string[]
  search?: string[]
  layout?: 'default' | 'refs' | 'ppt'
}

export const commentsReg = /^<!--.*\r?\n([\s\S]*?)-->/

export class MarkdownHelper {
  file: string
  meta: FileMeta

  constructor(file: string) {
    this.file = file
    this.meta = {}
  }

  split_file_by_section() {
    this.file = splitFileBySection(this.file)
    return this
  }

  replace_preview() {
    this.file = replacePreview(this.file)
    return this
  }

  // replace_comment(fn) {}

  parse_meta() {
    const content = this.file
    const str = content.startsWith('<!--') && content.match(commentsReg) ? content.match(commentsReg)![1] : ''

    try {
      const meta: FileMeta = yaml.load(str) || {}

      this.meta = meta
    } catch (error) {}
    // this.file = filterMeta(this.file)
    this.file = this.file.replace(commentsReg, '')
    return this
  }

  get() {
    return this
  }
}
