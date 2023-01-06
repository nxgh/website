import React, { PropsWithChildren } from 'react'
import { getMDXExport } from 'mdx-bundler/client'

export function SideBySide({ children }: PropsWithChildren) {
  const [left, right] = React.Children.toArray(children)
  return (
    <div className="flex flex-row gap-3 ch-cols">
      <div className="flex-1 min-w-0">{left}</div>
      <div className="flex-1 min-w-0">{right}</div>
    </div>
  )
}

function CodeSection({ children }: PropsWithChildren) {
  return <code className="inline-code">{children}</code>
}

export function MDXComponent({ code }: { code: string }) {
  const Component = React.useMemo(() => getMDXExport(code).default, [code])
  return <Component components={{ SideBySide, code: CodeSection }} />
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  SideBySide,
  MDXComponent,
}
