import dayjs from 'dayjs'

import type { AppProps } from 'next/app'

import '@code-hike/mdx/dist/index.css'
import 'dayjs/locale/zh-cn'
import 'windi.css'

import '../styles/globals.scss'
import '../styles/variables.scss'
import { createContext, useState } from 'react'

dayjs.locale('zh-cn')

function MyApp({ Component, pageProps }: AppProps) {
  const [state, setState] = useState({})

  const GlobalContext = createContext({})

  return (
    <GlobalContext.Provider
      value={{
        store: state,
        setStore: setState,
      }}
    >
      <Component {...pageProps} className="w-full h-full text-primary" />
    </GlobalContext.Provider>
  )
}

export default MyApp
