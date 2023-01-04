import React from 'react'
import { GetStaticProps } from 'next'

import getDir from 'src/mdx-helper/getDir'
import router from 'next/router';

export default function Index({ allPostsData }: { allPostsData: { id: string; title: string }[] }) {
  return (
    <>
      {allPostsData.map((item) => (
        <div key={item.id} onClick={() => {router.push(`/docs/${item.id}`)}}>{item.title}</div>
      ))}
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const files = await getDir('/docs')
  const allPostsData = files.map((item) => ({ id: item.filename, title: item.filename }))

  return {
    props: {
      allPostsData,
    },
  }
}
