import React from 'react'
import { GetStaticProps } from 'next'

import { getStaticPropsResult } from 'src/mdx-helper/getDir'
import { DocLayoutMenu } from 'src/Layout/DocLayout'

const basePath = '/docs'

export default function Index({ allPostsData }: { allPostsData: { id: string; title: string }[] }) {
  return <DocLayoutMenu postsData={allPostsData} basePath='docs' />
}

export const getStaticProps: GetStaticProps = async (context) =>
  await getStaticPropsResult(basePath, context.params?.slug! as string[])
