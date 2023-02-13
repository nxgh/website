import { useRouter } from 'next/router'
import { PropsWithChildren } from 'react'

import { filePaths } from '_config'
import style from './DocLayout.module.scss'

type IDocLayout = PropsWithChildren<{
  postsData: { id: string; title: string }[]
  onClick: (key: string) => void
}>

export default function Layout({ children, postsData, onClick }: IDocLayout) {
  const items = Object.entries(filePaths).reduce((arr: any[], item) => {
    if (item[1] !== '')
      arr = [
        ...arr,
        {
          label: item[1],
          key: item[0],
          children: postsData
            .filter((i) => i.category === item[0].replace('/', ''))
            .map((i) => ({ label: i.title, key: i.id })),
        },
      ]
    else
      arr = [
        ...arr,
        ...postsData.filter((i) => i.category === item[0].replace('/', '')).map((i) => ({ label: i.title, key: i.id })),
      ]
    return arr
  }, [])

  return (
    <div className={style.wrap}>
      <div style={{ width: '16vw' }}>
        <div className={style.sideMenu}>
          {/* <Menu
            style={{ height: '100%' }}
            // items={postsData.map((i) => ({ label: i.title, key: i.id }))}
            mode="inline"
            items={items}
            onClick={({ key }) => onClick(key)}
          /> */}
        </div>
      </div>
      <div style={{ width: '66vw' }}>
        <main className={`${style.mainContent} mdx-render`}>{children}</main>
      </div>
    </div>
  )
}

export function DocLayoutMenu({
  postsData,
  basePath,
}: {
  postsData: { id: string; title: string }[]
  basePath: string
}) {
  const router = useRouter()
  return (
    <div className={style.docLayoutMenu}>
      {postsData.map((item) => (
        <div
          key={item.id}
          onClick={() => {
            router.push(`/${basePath}/${item.id}`)
          }}
        >
          {item.title}
        </div>
      ))}
    </div>
  )
}
