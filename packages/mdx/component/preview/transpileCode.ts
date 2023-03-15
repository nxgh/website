import { useState } from 'react'
import React, { useContext, useEffect } from 'react'
// import { LiveContext } from '../LiveProvider'
// import { generateElement } from '../utils/transpile'
// import { Transform, transform } from 'sucrase'
// import Preview from './preview'

const data = `
function Child() {
  return <div>Child: {Date.now()}</div>
}
function Foo() {
  const [state, setState] = React.useState(0)
  return <div>
  <button onClick={()=>setState(state => state +=1)}>Click Me: {state}</button>
  <p>Foo: {Date.now()}</p>
  <Child />
  </div>
}

function Bar() {
  return <div>Bar: {Date.now()}</div>
}

export function App () {
  return (
    <>
    <Foo />
    <Bar />
    </>
  )
}

`
function evalCode(code: string, scope: Record<string, any>) {
  const scopeKeys = Object.keys(scope)
  const scopeValues = Object.values(scope)
  return new Function(...scopeKeys, code)(...scopeValues)
}

function generateNode({ code = '', scope = {} }) {
  // 删除末尾分号，因为下边会在 code 外包装一个 return (code) 的操作，有分号会导致语法错误
  // const codeTrimmed = code.trim().replace(/;$/, '')
  //   const opts = { transforms: ['jsx'] as Transform[] }
  // 前边补上一个 return，以便下边 evalCode 后能正确拿到生成的组件
  //   const transformed = transform(code, opts)
  // 编译后只是一个字符串，我们通过 evalCode 函数将它变成可执行代码
  // console.log(transformed)
  //   return transformed
  // return evalCode(transformed, { React, ...scope })
}
//
// function resolveElement(node: React.ReactNode) {
//   const Element = typeof node === 'function' ? node : () => <>{React.isValidElement(node) ? node : null}</>
//   return <Element />
// }

function transpileCode(code: string) {
  const input = {
    code: code,
    // sco,
  }

  const output = generateNode(input)

  return output
}

export default transpileCode

// function App() {
//   const [count, setCount] = useState(0)

//   const element = transpileCode(data)
//   // console.log('element', element.code)

//   return (
//     <div className='App'>
//       {/* <Preview code={String(element.code)} /> */}
//     </div>
//   )
// }

// export default App
