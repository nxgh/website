import React, { PropsWithChildren } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'

import { getStaticPathsResult, getStaticPropsResult } from 'src/mdx-helper/getDir'
import { MDXComponent } from 'src/mdx-helper/MDXComponent'

const basePath = '/doc-three'

export const getStaticPaths: GetStaticPaths = async () => await getStaticPathsResult(basePath)

export const getStaticProps: GetStaticProps = async (context) =>
  await getStaticPropsResult(basePath, context.params?.slug! as string[])

export default function Layout({
  previewSource,
  allPostsData,
}: PropsWithChildren<{
  previewSource: string
  allPostsData: { id: string; title: string }[]
}>) {
  return <MDXComponent code={previewSource} />
}
