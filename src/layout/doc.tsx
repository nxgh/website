import Link from 'next/link'
import { useState, useEffect, memo, useMemo, useCallback, useContext } from 'react'
import BaseLayout from './base'
import MdxContent from './mdx-content'

import Aside from './aside'

function DocLayout({ children }: { children: React.ReactNode }) {
  return (
    <BaseLayout>
      <BaseLayout.Aside>
        <Aside />
      </BaseLayout.Aside>
      <BaseLayout.Handler>Handler</BaseLayout.Handler>
      <div>
        <MdxContent>{children}</MdxContent>
      </div>
    </BaseLayout>
  )
}

export default memo(DocLayout)
