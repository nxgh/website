import { createContext, PropsWithChildren, ReactNode, useState, createElement } from 'react'
import Aside from './aside'
import style from './index.module.scss'

import type { FileList } from 'src/components/files'

const LayoutContext = createContext({})

const Header = ({ children }: PropsWithChildren) => {
  return <>{children}</>
}

const Main = ({ children }: PropsWithChildren) => {
  return <>{children}</>
}

const Layout = (props: PropsWithChildren<{ fileList: FileList }>) => {
  const filterChildren = (children: ReactNode, type: (props: PropsWithChildren<any>) => JSX.Element) =>
    children instanceof Array ? children.find((child) => (child.type === type ? child : null)) : null

  return (
    <LayoutContext.Provider value={{}}>
      <div className={`${style.layout} w-full h-full relative`}>
        <div className="relative w-full h-full">
          <header className="h-[3vh] border-b"></header>
          <div className="w-full flex h-[97vh] ">
            <Aside fileList={props.fileList} />
            <main className="mdx-render w-full overflow-auto px-10 pt-10 pb-20">{props.children}</main>
          </div>
        </div>
      </div>
    </LayoutContext.Provider>
  )
}

export default Layout
