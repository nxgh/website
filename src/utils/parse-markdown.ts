export default function splitMarkdownBlockByHeader(markdown: string) {
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
