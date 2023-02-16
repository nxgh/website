// import yaml from 'js-yaml'
import fs from 'fs'
import type { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import path from 'path'
import { FC, PropsWithChildren } from 'react'
import { isEndWith } from 'src/utils'

const Menu = [
  {
    title: 'Three.js',
    path: '/three-js/basic-component',
  },
]

type IProps = {
  files: {
    files: string[]
    title: string
    path: string
  }[]
}

const Home: NextPage<IProps> = ({ files }) => {
  const router = useRouter()
  return (
    <div>
      {files.map((item) => {
        return (
          <div key={item.title}>
            <h2
              onClick={() => {
                router.push(`${item.path}/index`)
              }}
            >
              {item.title}
            </h2>
            <ul>
              {item.files.map((file) => {
                const path = `${item.path}/${file.replace(/\.(mdx|md|tsx|ts)$/, '')}`
                return (
                  <li key={path}>
                    <a
                      onClick={() => {
                        router.push(path)
                      }}
                    >
                      {path}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const paths: Record<string, { title: string; path: string }> = {
    '/pages/three-js': {
      title: 'Three.js 交互式指南',
      path: '/three-js',
    },
    '/notes/cheat-sheet': {
      title: '速查表',
      path: '/cheat-sheet',
    },
    '/notes/docs': {
      title: '笔记本',
      path: '/notes',
    },
  }

  const files = Object.keys(paths).map((item) => {
    const files = fs
      .readdirSync(path.join(process.cwd(), item))
      .filter((f) => isEndWith(f, ['.mdx', '.md', '.tsx', '.ts']))

    return {
      ...paths[item],
      files: files.slice(files.length - 10),
    }
  })

  return { props: { files } }
}

export default Home
