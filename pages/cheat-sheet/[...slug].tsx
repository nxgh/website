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
  return <section className="bg-dark color-white w-[20vw]">{children}</section>
}
export default function Layout(props: IProps) {
  return (
    <>
      <MDXComponent code={props.code} components={{ Split }} />
    </>
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

  const data = parseMarkdown(content).map((item) => `\n<Split>\n${item}\n</Split>\n`).join('')

  const { code } = await renderMDX(data)

  return {
    props: { filename, code },
  }
}
