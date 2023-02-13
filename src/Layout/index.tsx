import { useRouter } from 'next/router'
import type { FC, PropsWithChildren } from 'react'

const Layout: FC<PropsWithChildren> = (props) => {
  const router = useRouter()

  return (
    <div className="layout full">
      <div className={`w-full h-full overflow-auto base-layout ${router.asPath?.split('/')?.[1]}-layout`}>
        {props.children}
      </div>
    </div>
  )
}

export default Layout
