import { GetStaticProps } from 'next'
import { PropsWithChildren } from 'react'

import fs from 'fs'
import path from 'path'
import { useRouter } from 'next/router'

type IProps = PropsWithChildren<{
  paths: string[]
}>
export default function Layout(props: IProps) {
  const router = useRouter()

  return (
    <>
      {props.paths.map((p) => {
        return <h2 onClick={() => router.push(`/three-js/${p}`)}>{p}</h2>
      })}
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const paths = fs
    .readdirSync(path.join(process.cwd(), '/pages/three-js'))
    .map((item) => item.replace(/\.mdx|\.md/, ''))

  return {
    props: { paths },
  }
}
