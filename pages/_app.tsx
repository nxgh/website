import dayjs from 'dayjs'

import type { AppProps } from 'next/app'

import '@code-hike/mdx/dist/index.css'
import 'dayjs/locale/zh-cn'
import 'windi.css'

import '../styles/globals.scss'
import '../styles/variables.scss'
import { createContext, ReactElement, ReactNode, useMemo, useState } from 'react'
import { NextPage } from 'next'
import DcoLayout from 'src/layout/doc'

dayjs.locale('zh-cn')

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(<Component {...pageProps} />)
  // return (
  // <DcoLayout>
  // <Component {...pageProps} />
  // </DcoLayout>
  // )
}

export default MyApp
