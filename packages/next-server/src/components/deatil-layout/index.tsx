import { PropsWithChildren } from 'react'

const DefaultLayoutWrapper = (props: PropsWithChildren<{ onClick: () => void }>) => (
  <div className="layout-default px-[15%]" {...props}>
    <div className="px-[5%] bg-red-100 mesh">{props.children}</div>
  </div>
)

const RefsLayoutWrapper = (props: PropsWithChildren<{ onClick: () => void }>) => (
  <div {...props} className="layout-refs">
    {props.children}
  </div>
)

export default (props: PropsWithChildren<{ layout: 'default' | 'refs' | 'ppt'; onClick: () => void }>) => {
  const LayoutMap = {
    default: DefaultLayoutWrapper,
    refs: RefsLayoutWrapper,
    ppt: DefaultLayoutWrapper,
  }

  const Layout = LayoutMap[props.layout]
  return <Layout {...props}>{props.children}</Layout>
}
