import fs from 'fs'
import path from 'path'

import { GetStaticPaths, GetStaticProps } from 'next'
import { PropsWithChildren } from 'react'

import renderMDX from 'src/utils/render-mdx'
import { MDXComponent } from 'src/components/mdx-component'
import { commentFilter, filterMeta, readFileFn } from 'src/utils/read-file'

type IProps = PropsWithChildren<{
  filename: string
  code: string
}>
export default function Layout(props: IProps) {
  return <MDXComponent code={props.code} />
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

  console.log(file)

  // const dir = fs.readdirSync(path.join(process.cwd(), `/notes/docs`)).find((i) => i.startsWith(id))
  // const filename = path.join(process.cwd(), `/notes/docs/${dir}`)

  // const content = fs.readFileSync(filename, 'utf8')

  const { code } = await renderMDX(file[0].content)

  return {
    props: { code },
  }
}
