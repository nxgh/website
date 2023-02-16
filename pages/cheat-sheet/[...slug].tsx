import { GetStaticPaths, GetStaticProps } from 'next'
import { PropsWithChildren } from 'react'

import fs from 'fs'
import path from 'path'
import renderMDX from 'src/utils/render-mdx'
import { MDXComponent } from 'src/components/mdx-component'

type IProps = PropsWithChildren<{
  filename: string
  code: string
}>
export default function Layout(props: IProps) {
  return <MDXComponent code={props.code} />
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
  const { code } = await renderMDX(content)

  return {
    props: { filename, code },
  }
}
