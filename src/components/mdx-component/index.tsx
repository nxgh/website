import { getMDXComponent } from 'mdx-bundler/client'
import React, { PropsWithChildren } from 'react'

import Preview from 'src/components/preview'

function CodeSection({ children }: PropsWithChildren) {
  return <code className="inline-code">{children}</code>
}
function Section(props: PropsWithChildren<{ className?: string; id?: string }>) {
  return (
    <section className={props.className} id={props.id}>
      {props.children}
    </section>
  )
}

export function MDXComponent({ code, components }: { code: string; components?: Record<string, any> }) {
  const Component = React.useMemo(() => {
    return getMDXComponent(code)
  }, [code])
  return <Component components={{ code: CodeSection, Section, Preview, ...components }} />
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default MDXComponent
