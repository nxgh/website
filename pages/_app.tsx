import dayjs from 'dayjs'

import type { AppProps } from 'next/app'

import '@code-hike/mdx/dist/index.css'
import 'dayjs/locale/zh-cn'
import 'windi.css'

import '../styles/globals.scss'
import '../styles/variables.scss'
import { createContext, ReactElement, ReactNode, useMemo, useState } from 'react'
import { NextPage } from 'next'
import DcoLayout from 'src/app-layout/doc'

dayjs.locale('zh-cn')

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  console.log('app render')

  // const [state, setState] = useState({})

  // const GlobalContext = createContext({})

  // const Layout = useMemo(() => {
  //   return Component.getLayout || ((page) => page)
  // }, [Component])

  // return Layout(<Component {...pageProps} />)

  return (
    <DcoLayout>
      <Component {...pageProps} />
    </DcoLayout>
  )

  // return <Layout {...pageProps}>{<Component {...pageProps} />}</Layout>
  // return (
  //   <GlobalContext.Provider
  //   value={{
  //     store: state,
  //     setStore: setState,
  //   }}
  //   >
  // <Component {...pageProps}  />
  // </GlobalContext.Provider>
  // )
}

export default MyApp
