import { getMDXComponent } from 'mdx-bundler/client'
import React, { PropsWithChildren } from 'react'

function CodeSection({ children }: PropsWithChildren) {
  return <code className='inline-code'>{children}</code>
}
function Section(props: PropsWithChildren<{ className?: string; id?: string }>) {
  return (
    <section className={props.className} id={props.id}>
      {props.children}
    </section>
  )
}

function Preview(props: PropsWithChildren<{ data: string; type: 'HTML' | 'JSX' }>) {
  const normalize = `<link href="https://cdn.bootcdn.net/ajax/libs/normalize/8.0.1/normalize.min.css" rel="stylesheet"></link>`
  const defaultStyle = `<style>html,body{ width: 100vw; height: 100vh}</style>` + normalize
  if (props.type === 'HTML') return <iframe srcDoc={`${defaultStyle}\n` + props.data} sandbox='allow-scripts' className='w-full h-full' />
  // if (props.type === 'JSX') return ()

  return <></>
}

export function MDXComponent({ code, components }: { code: string; components?: Record<string, any> }) {
  const Component = React.useMemo(() => getMDXComponent(code), [code])
  return <Component components={{ code: CodeSection, Section, Preview, ...components }} />
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default MDXComponent
