import React from 'react'
import { GetStaticProps } from 'next'

import { getStaticPropsResult } from 'src/mdx-helper/getDir'
import router from 'next/router'

export default function Index({ allPostsData }: { allPostsData: { id: string; title: string }[] }) {
  return (
    <>
      {allPostsData.map((item) => (
        <div
          key={item.id}
          onClick={() => {
            router.push(`/docs/${item.id}`)
          }}
        >
          {item.title}
        </div>
      ))}
    </>
  )
}

const basePath = '/docs'

export const getStaticProps: GetStaticProps = async (context) =>
  await getStaticPropsResult(basePath, context.params?.slug! as string[])
