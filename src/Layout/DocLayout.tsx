import { Menu } from 'antd'
import { PropsWithChildren } from 'react'

import style from './DocLayout.module.scss'

type IDocLayout = PropsWithChildren<{
  postsData: { id: string; title: string }[]
  onClick: (key: string) => void
  route: string
}>

export default function Layout({ children, postsData, onClick, route }: IDocLayout) {
  console.log(route)

  return (
    <div className={style.wrap}>
      <div style={{ width: '16vw' }}>
        <div className={style.sideMenu}>
          <Menu
            style={{ height: '100%' }}
            items={postsData.map((i) => ({ label: i.title, key: i.id }))}
            onClick={({ key }) => onClick(key)}
          />
        </div>
      </div>
      <div style={{ width: '66vw' }}>
        <main className={`${style.mainContent} mdx-render`}>{children}</main>
      </div>
    </div>
  )
}
