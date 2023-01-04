import React from 'react'

import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Layout from 'src/Layout'

import '@code-hike/mdx/dist/index.css'

import { ConfigProvider } from 'antd'

ConfigProvider.config({
  theme: {
    primaryColor: '#25b864',
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} className="w-full h-full" />
    </Layout>
  )
}

export default MyApp
