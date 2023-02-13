import { GetStaticProps } from 'next'

import { DocLayoutMenu } from 'src/Layout/DocLayout'
import { getStaticPropsResult } from 'src/mdx-helper'

const basePath = '/docs'

export default function Index({ allPostsData }: { allPostsData: { id: string; title: string }[] }) {
  return <DocLayoutMenu postsData={allPostsData} basePath='docs' />
}

export const getStaticProps: GetStaticProps = async (context) =>
  await getStaticPropsResult(basePath, context.params?.slug! as string[])
