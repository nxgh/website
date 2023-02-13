import dayjs from 'dayjs'
import Layout from 'src/Layout'

import type { AppProps } from 'next/app'

import 'uno.css'

import '@code-hike/mdx/dist/index.css'
import 'dayjs/locale/zh-cn'

import '../styles/globals.scss'

dayjs.locale('zh-cn')

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} className="w-full h-full" />
    </Layout>
  )
}

export default MyApp
