import { useRouter } from 'next/router'
import type { FC, PropsWithChildren, ReactElement, ReactNode } from 'react'

import InteractiveLayout from './interactive-layout'
import DocLayout from './doc-layout'
import CheatSheetLayout from './cheat-sheet-layout'

const DefaultLayout = ({ children }: PropsWithChildren<unknown>): ReactElement => <main className='w-full h-full'>{children}</main>

const layoutMap: Record<string, FC<PropsWithChildren<any>>> = {
  'three-js': InteractiveLayout,
  notes: DocLayout,
  'cheat-sheet': CheatSheetLayout,
}

const Layout: FC<PropsWithChildren> = (props) => {
  const router = useRouter()

  const Layout = layoutMap[router.asPath.split('/')[1]] || DefaultLayout

  return <Layout>{props.children}</Layout>
}

export default Layout
