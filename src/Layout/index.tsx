import { useRouter } from 'next/router'
import type { FC, PropsWithChildren, ReactElement, ReactNode } from 'react'

import InteractiveLayout from './interactive-layout'
import DocLayout from './doc-layout'
import CheatSheetLayout from './cheat-sheet-layout'

const layoutMap: Record<string, FC<PropsWithChildren<any>>> = {
  'three-js': InteractiveLayout,
  'notes': DocLayout,
  'cheat-sheet': CheatSheetLayout,
}

const Layout: FC<PropsWithChildren> = (props) => {
  const router = useRouter()

  const Layout = layoutMap[router.asPath.split('/')[1]] || InteractiveLayout

  return <Layout className="layout bg-red full overflow-auto">{props.children}</Layout>
}

export default Layout
