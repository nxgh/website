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
  return (
    <div className='preview'>
      <iframe style={style} sandbox='allow-scripts' title='preview' srcDoc={srcDoc} />
    </div>
  )
}

Preview.React = ({ code }: { code: string }) => <Preview srcDoc={ReactTranspiledCode(code)} />
Preview.Html = ({ code }: { code: string }) => <Preview srcDoc={HTMLTranspiled(code)} />

export default Preview
