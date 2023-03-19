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
type AnymatchFn = (testString: string) => boolean
export type AnymatchPattern = string | RegExp | AnymatchFn

export type MDFile = string

export type ReplaceCommentRule = {
  regex: RegExp
  replacer: (...args: any[]) => string
}

/** 处理分割后的 markdown 文件  */
export function splitFileBySection(file: string) {
  return splitMarkdownBlockByHeader(file)
    .map((item) => {
      if (item.every((i) => i === '' || i === '\n')) return ''
      // const isHeader = (str: string) => str.match(/^(#*?)\s/)?.[1].length || 0
      // if (isHeader(item[0]) === 1) {
      //   return `<section className="section" id="section-h1">\n${item.join('')}\n</section>\n`
      // }
      return `<section className="section">\n${item.join('')}\n</section>\n`
    })
    .join('')
}

export const replaceMetaRule: ReplaceCommentRule = {
  regex: /^<!--.*\r?\n([\s\S]*?)-->/gm,
  replacer: () => '',
}

export const replacePreviewRule: ReplaceCommentRule = {
  regex: /<!-- <Preview\.(.*?)> -->([\s\S]*?)<!-- <\/Preview\..*?> -->/gm,
  replacer: (match: string, p1: string, p2: string) => {
    const data: string = p2.replaceAll(/```.*?\n/g, '')
    return `
<div className="ch-scroll-coding-with-preview"> 
    <CH.Code>
        ${p2}
    </CH.Code>
    <Preview.${p1} code={${JSON.stringify(data)}} />
</div>`
  },
}

export function replaceComment(content: MDFile, rule: ReplaceCommentRule | ReplaceCommentRule[]) {
  if (Array.isArray(rule)) {
    return rule.reduce((newContent, cur) => {
      return newContent.replaceAll(cur.regex, cur.replacer)
    }, content)
  }
  return content.replaceAll(rule.regex, rule.replacer)
}

