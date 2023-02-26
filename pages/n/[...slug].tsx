import fs from 'fs'
import path from 'path'

import { GetStaticPaths, GetStaticProps } from 'next'
import { PropsWithChildren, useState } from 'react'

import renderMDX from 'src/utils/render-mdx'
import { MDXComponent } from 'src/components/mdx-component'
import { commentFilter, filterMeta, readFileFn } from 'src/utils/read-file'
import parseMarkdown from 'src/utils/parse-markdown'

type IProps = PropsWithChildren<{
  filename: string
  code: string
}>

const Split = ({ children }: PropsWithChildren<{}>) => {
  if (!children) return <></>
  return (
    <section style={{ width: 'fit-content' }} className="bg-dark color-white w-[20vw] m-5">
      {children}
    </section>
  )
}

const refsComponent = { Split }

export default function Layout(props: IProps) {
  const [layout, setLayout] = useState('Default')

  const [tocVisiable, setTocVisiable] = useState(false)
  return (
    <div className={`${tocVisiable ? 'toc-render' : 'toc-hidden'} mdx-render px-20 pb-50 relative`}>
      <header>
        <span className="toc-switch" onClick={() => setTocVisiable(!tocVisiable)}>
          Toc
        </span>
        {['refs', 'Default'].map((i) => (
          <button key={i} onClick={() => setLayout(i)}>
            {i}
          </button>
        ))}
      </header>
      {layout === 'refs' && (
        <div className="overflow-auto w-full  flex flex-wrap h-[4000px] p-10">
          <MDXComponent code={props.code} components={refsComponent} />
        </div>
      )}
      <div className="px-[15%]">
        <div className="px-[5%] bg-red-100 mesh">
          <MDXComponent code={props.code} />
        </div>
      </div>

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
      // file: file,
      meta: filterMeta(file),
      content: commentFilter(file),
    }
  })

  const maxLength = (arr: string[]) =>
    arr.reduce((maxLength: number, item: string) => (maxLength = item.length > maxLength ? item.length : maxLength), 0)

  const data =
    // file[0].content

    parseMarkdown(file[0].content)
      .map((item) => `<section len="${maxLength(item)}">\n${item.join('')}\n</section>\n`)
      .join('')

  const { code } = await renderMDX(data)

  return {
    props: { code },
  }
}
