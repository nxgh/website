import React, { useReducer } from 'react'
import type { FC, PropsWithChildren } from 'react'
import { Button, Layout as AntDLayout } from 'antd'
import { useRouter } from 'next/router'

import MenuConfig from '_config'

const { Header, Content } = AntDLayout

const Layout: FC<PropsWithChildren> = (props) => {
  const router = useRouter()

  return (
    <AntDLayout className="layout full">
      <Header className="link-group">
        {MenuConfig.map(({ name, path }) => (
          <Button key={path} type="link" onClick={() => router.push(path)}>
            {name}
          </Button>
        ))}
      </Header>
      <Content className={`w-full h-full overflow-auto base-layout ${router.asPath?.split('/')?.[1]}-layout`}>
        {props.children}
      </Content>
    </AntDLayout>
  )
}

export default Layout
