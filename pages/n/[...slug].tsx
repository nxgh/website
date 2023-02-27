import fs from 'fs'
import path from 'path'

import { PropsWithChildren, useState } from 'react'
import Image from 'next/image'

import type { GetStaticPaths, GetStaticProps } from 'next'

import renderMDX from 'src/utils/render-mdx'
import { MDXComponent } from 'src/components/mdx-component'
import { commentFilter, filterMeta, readFileFn } from 'src/utils'
import parseMarkdown from 'src/utils/parse-markdown'

type IProps = PropsWithChildren<{
  filename: string
  code: string
  layout: 'default' | 'refs' | 'ppt'
}>

type LayoutType = 'default' | 'refs' | 'ppt'

const Header = (props: {
  setTocVisiable: (visiable: boolean) => void
  tocVisiable: boolean
  layout: LayoutType
  changeLayout: (layout: LayoutType) => void
}) => {
  return (
    <header className="flex items-center justify-between border-b-1 py-2">
      <span className="toc-switch font-missaluncialemaster" onClick={() => props.setTocVisiable(!props.tocVisiable)}>
        Toc
      </span>
      <div>
        {(['default', 'refs', 'ppt'] as const).map((i) => {
          return (
            <span
              onClick={() => props.changeLayout(i)}
              key={i}
              className={`${
                props.layout === i ? 'font-missaluncialebricks' : 'font-missaluncialemaster'
              } inline-flex text-2xl px-1 cursor-pointer`}
              title={i}
            >
              {i[0]}
            </span>
          )
        })}
      </div>
    </header>
  )
}

const DefaultLayoutWrapper = (props: PropsWithChildren) => (
  <div className="px-[15%]">
    <div className="px-[5%] bg-red-100 mesh">{props.children}</div>
  </div>
)

const RefsLayoutWrapper = (props: PropsWithChildren) => (
  <div className="layouts-refs overflow-auto w-full  flex flex-wrap h-[4000px] p-10">{props.children}</div>
)

const LayoutMap = {
  default: DefaultLayoutWrapper,
  refs: RefsLayoutWrapper,
  ppt: DefaultLayoutWrapper,
}

export default function Layout(props: IProps) {
  const [layout, setLayout] = useState(props.layout)
  const [tocVisiable, setTocVisiable] = useState(false)

  const LayoutWrapper = LayoutMap[layout]

  return (
    <div className={`${tocVisiable ? 'toc-render' : 'toc-hidden'} mdx-render px-20 pb-50 relative`}>
      <Header layout={layout} changeLayout={setLayout} tocVisiable={tocVisiable} setTocVisiable={setTocVisiable} />
      <LayoutWrapper>
        <MDXComponent code={props.code} />
      </LayoutWrapper>
      <footer className="absolute bottom-20 left-[35%]">我是有底线的</footer>
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
        return `<section id="section-h1">\n${item.join('')}\n</section>\n`
      }
      return `<section>\n${item.join('')}\n</section>\n`
    })
    .join('')

  const { code } = await renderMDX(data)

  return {
    props: { code, data, layout: file[0]?.meta?.layout || 'default' },
  }
}
