import transpileCode from './transpileCode'

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

export const React_Template = (code: string) => `
<!DOCTYPE html>
<html lang="en">
  <body>
    <div id="root"></div>
    <script type="module">
      import React from 'https://esm.sh/react'
      import ReactDOM from 'https://esm.sh/react-dom'
      ${code}
      ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(${parseExportFunctionName(code)}))
    </script>
  </body>
</html>
`

export default function ReactTranspiledCode(code: string) {
  return React_Template(transpileCode(code).code)
}
