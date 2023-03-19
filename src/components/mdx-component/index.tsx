import { getMDXComponent } from 'mdx-bundler/client'
import React from 'react'

import Preview from './preview'

export function MDXComponent({ code, components }: { code: string; components?: Record<string, any> }) {
  const Component = React.useMemo(() => {
    return getMDXComponent(code)
  }, [code])
  return <Component components={{ Preview, ...components }} />
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default MDXComponent
