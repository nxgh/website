import React, { PropsWithChildren, useEffect, useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'

import renderMDX from 'src/mdx-helper/renderMDX'
import getDir from 'src/mdx-helper/getDir'
import { MDXComponent } from 'src/components/MDXComponent'
import { useRouter } from 'next/router'
import DocLayout from 'src/Layout/DocLayout'

const basePath = '/docs'

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

  const previewSource = await renderMDX(mdxSource?.content!, { toc: true })
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
  const router = useRouter()

  return (
    <DocLayout postsData={allPostsData} onClick={(key) => router.push(`/docs/${key}`)}>
      <MDXComponent code={previewSource} />
    </DocLayout>
  )
}
