import React, { PropsWithChildren } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'

import renderMDX from 'src/mdx-helper/renderMDX'
import getDir from 'src/mdx-helper/getDir'
import { MDXComponent } from 'src/components/MDXComponent'

const basePath = '/doc-three'

export const getStaticPaths: GetStaticPaths = async () => {
  const docsFile = await getDir(basePath)
  const paths = docsFile.map((item) => ({
    params: { slug: [item.filename] },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const [id] = context.params!.slug!
  const files = await getDir(basePath)
  const mdxSource = files.find((item) => item.filename === id)
  const allPostsData = files.map((item) => ({ id: item.filename, title: item.filename }))

  const previewSource = await renderMDX(mdxSource?.content!, { toc: false })
  return {
    props: {
      previewSource: previewSource.code,
      allPostsData,
      id,
    },
  }
}

export default function Layout({
  previewSource,
  allPostsData,
}: PropsWithChildren<{
  previewSource: string
  allPostsData: { id: string; title: string }[]
}>) {
  return <MDXComponent code={previewSource} />
}
