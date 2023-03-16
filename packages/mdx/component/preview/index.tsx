import React from 'react'
import ReactTranspiledCode from './react.preview'
import HTMLTranspiled from './html.preview'

const style = {
  width: '100%',
  height: '100%',
  border: 0,
  borderRadius: '4px',
  overflow: 'hidden',
}

function Preview({ srcDoc }: { srcDoc: string }) {
  const [show, setShow] = React.useState(false)

  return (
    <div>
      <button onClick={() => setShow(!show)}>{show ? '收起' : '展开'}</button>
      <div
        style={{
          height: show ? '100%' : '0',
          background: '#fff',
          border: show ? '1px solid #eee' : 'none',
          borderRadius: '4px',
        }}>
        <iframe style={style} sandbox='allow-scripts' title='preview' srcDoc={srcDoc} />
      </div>
    </div>
  )
}

Preview.React = ({ code }: { code: string }) => <Preview srcDoc={ReactTranspiledCode(code)} />
Preview.Html = ({ code }: { code: string }) => <Preview srcDoc={HTMLTranspiled(code)} />

export default Preview
