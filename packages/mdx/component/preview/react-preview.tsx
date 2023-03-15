import React from 'react'

const template = (code: string, exportName: string) => `
<!DOCTYPE html>
<html lang="en">
  <body>
    <div id="root"></div>

    <script type="module">
      import React from 'https://esm.sh/react'
      import ReactDOM from 'https://esm.sh/react-dom'
      ${code}
      ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(${exportName}))
    </script>
  </body>
</html>
`

const parseExportFunctionName = (code: string) => {
  const funReg = /export function\s+(\w+)\s*\(/
  const arrReg = /export const (\w+)\s=/
  return [funReg, arrReg].reduce((exportName, reg) => {
    const match = code.match(reg)
    if (match) {
      exportName = match[1]
    }
    return exportName
  }, '')
}

export default function Preview({ code }: { code: string }) {
  // console.log('code', code)

  const exportName = parseExportFunctionName(code)

  return <iframe title='preview' srcDoc={template(code, exportName)} />
}
