import React, { useReducer } from 'react'
import type { FC, PropsWithChildren } from 'react'
import { Button, Layout as AntDLayout } from 'antd'
import { useRouter } from 'next/router'

import { reducer, StateContext, DispatchContext, initialState as reducerInitialState } from 'src/model'

import MenuConfig from '_config'

const { Header, Content } = AntDLayout

type FCP<T = {}> = FC<PropsWithChildren<T>>

const HeaderContent = () => {
  const router = useRouter()
  return (
    <div className="link-group">
      {MenuConfig.map(({ name, path }) => (
        <Button key={path} type="link" onClick={() => router.push(path)}>
          {name}
        </Button>
      ))}
    </div>
  )
}

const BlogLayout: FCP = ({ children }) => {
  return (
    <div className="full blog-layout" style={{ padding: '0 40px', overflow: 'auto' }}>
      {children}
    </div>
  )
}

const ContentLayout: FCP = ({ children }) => {
  const router = useRouter()
  if (router.asPath.startsWith('/three')) {
    return <BlogLayout>{children}</BlogLayout>
  }
  return <>{children}</>
}

const ContextProviderLayout: FCP = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, reducerInitialState)
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </StateContext.Provider>
  )
}

const Layout: FC<PropsWithChildren> = (props) => {
  return (
    <ContextProviderLayout>
      <AntDLayout className="layout full">
        <Header>
          <HeaderContent />
        </Header>
        <Content className="w-full h-full overflow-auto">
          <ContentLayout>{props.children}</ContentLayout>
        </Content>
      </AntDLayout>
    </ContextProviderLayout>
  )
}

export default Layout
