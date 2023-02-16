import {
    getMDXComponent
} from 'mdx-bundler/client'
import React, { PropsWithChildren } from 'react'
  
  function CodeSection({ children }: PropsWithChildren) {
    return <code className="inline-code">{children}</code>
  }
  
  export function MDXComponent({ code }: { code: string }) {
    const Component = React.useMemo(() => getMDXComponent(code), [code])
    return <Component components={{ code: CodeSection }} />
  }
  
  /* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
  export default {
    MDXComponent,
  }
  