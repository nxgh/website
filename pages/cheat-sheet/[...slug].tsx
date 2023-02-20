import fs from 'fs'
import path from 'path'

import { GetStaticPaths, GetStaticProps } from 'next'
import { PropsWithChildren } from 'react'

import renderMDX from 'src/utils/render-mdx'
import { MDXComponent } from 'src/components/mdx-component'
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

export default function Layout(props: IProps) {
  return (
    <div className="overflow-auto w-full  flex flex-wrap h-[4000px] p-10">
      <MDXComponent code={props.code} components={{ Split }} />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = fs.readdirSync(path.join(process.cwd(), '/notes/cheat-sheet')).map((item) => ({
    params: { slug: [item.replace(/\.mdx|\.md/, '')] },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = (context.params!.slug as string[]).join('/')
  const filename = path.join(process.cwd(), `/notes/cheat-sheet/${id}.md`)
  const content = fs.readFileSync(filename, 'utf8')

  const maxLength = (arr: string[]) =>
    arr.reduce((maxLength: number, item: string) => (maxLength = item.length > maxLength ? item.length : maxLength), 0)

  const data = parseMarkdown(content)
    .map((item) => `<Split len="${maxLength(item)}">\n${item.join('')}\n</Split>\n`)
    .join('')

  const { code } = await renderMDX(data)

  return {
    props: { filename, code },
  }
}
