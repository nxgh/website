import fs from 'fs'
import path from 'path'

import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import type { GetStaticPaths, GetStaticProps } from 'next'

import renderMDX from 'src/utils/render-mdx'
import { MDXComponent } from 'src/components/mdx-component'
import { useTheme, commentFilter, filterMeta, readFileFn, parseMarkdown } from 'src/utils'
import Header, { addDataset, useHeader } from 'src/components/header'

type IProps = PropsWithChildren<{
  filename: string
  code: string
  layout: 'default' | 'refs' | 'ppt'
}>

const DefaultLayoutWrapper = (props: PropsWithChildren<{ onClick: () => void }>) => (
  <div className="layout-default px-[15%]" {...props}>
    <div className="px-[5%] bg-red-100 mesh">{props.children}</div>
  </div>
)

const RefsLayoutWrapper = (props: PropsWithChildren<{ onClick: () => void }>) => (
  <div {...props} className="layout-refs">
    {props.children}
  </div>
)

const LayoutMap = {
  default: DefaultLayoutWrapper,
  refs: RefsLayoutWrapper,
  ppt: DefaultLayoutWrapper,
}

function Section(props: PropsWithChildren<{ className?: string; id?: string }>) {
  return (
    <section className={props.className} id={props.id}>
      {props.children}
    </section>
  )
}

export default function Layout(props: IProps) {
  const headerProps = useHeader()

  const ref = useRef<HTMLDivElement>(null)
  const LayoutWrapper = LayoutMap[headerProps.layout]

  const showToc = () => {
    if (!ref.current) return
    addDataset(ref.current!, { toc: 'show' })
  }

  return (
    <div className={`mdx-render lg:px-10 xl:px-20 <sm:px-2 pb-5 relative text-primary`} data-toc="hide" ref={ref}>
      <Header {...headerProps} changeToc={showToc} />
      <LayoutWrapper onClick={() => addDataset(ref.current!, { toc: 'hide' })}>
        <MDXComponent code={props.code} components={{ Section }} />
      </LayoutWrapper>
      <footer id="footer" className="absolute bottom-[3vh] left-[10vw] right-[10vw]  border-b-3 "></footer>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = readFileFn('/notes', (params) => {
    return {
      title: params.filename,
    }
  })
  const paths = files.map((item) => ({
    params: { slug: [item.title.replace(/\.mdx|\.md/, '')] },
  }))
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = (context.params!.slug as string[]).join('/')

  const file = readFileFn('/notes', ({ filename, __path }) => {
    if (id !== filename.replace(/\.mdx?/, '')) return null
    const file = fs.readFileSync(path.join(__path, filename), 'utf-8')
    return {
      meta: filterMeta(file),
      content: commentFilter(file),
    }
  })

  const data = parseMarkdown(file[0].content)
    .map((item) => {
      const isHeader = (str: string) => str.match(/^(#*?)\s/)?.[1].length || 0
      if (item.every((i) => i === '' || i === '\n')) return ''
      if (isHeader(item[0]) === 1) {
        return `<Section className="section" id="section-h1">\n${item.join('')}\n</Section>\n`
      }
      return `<Section className="section">\n${item.join('')}\n</Section>\n`
    })
    .join('')

  const { code } = await renderMDX(data)

  return {
    props: { code, data, layout: file[0]?.meta?.layout || 'default' },
  }
}
