import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, memo, useMemo, useCallback, useContext } from 'react'
import BaseLayout from './base'
import MdxContent from './mdx-content'

import Aside from './aside'
import ThemeIcon from './theme-button'

function DocLayout({ children }: { children: React.ReactNode }) {
  return (
    <BaseLayout className="flex full">
      <BaseLayout.Aside className="w-[20vw] h-full relative">
        <Aside />
      </BaseLayout.Aside>
      <div className="w-full h-full overflow-auto relative">
        <header className="sticky top-0 w-ful  h-[5vh] flex justify-between items-center border-b backdrop-filter backdrop-blur-md z-index-10 px-10">
          <BaseLayout.Handler className="">
            <Image src="/icon/arrow-left.svg" width={20} height={20} />
            <Image src="/icon/arrow-right.svg" width={20} height={20} />
          </BaseLayout.Handler>
          <ThemeIcon className="" />
        </header>
        <MdxContent>{children}</MdxContent>
      </div>
    </BaseLayout>
  )
}

export default memo(DocLayout)
