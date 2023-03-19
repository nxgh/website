import { createContext, PropsWithChildren, useContext, useState } from 'react'
import type { PropsWithClassname } from 'src/types'

const LayoutContext = createContext<{
  visable: boolean
  setVisable: (visable: boolean) => void
}>({
  visable: true,
  setVisable: () => {},
})

function Provider(props: PropsWithChildren) {
  const [visable, setVisable] = useState(true)

  return <LayoutContext.Provider value={{ visable, setVisable }}>{props.children}</LayoutContext.Provider>
}

function BaseLayout(props: PropsWithClassname) {
  const { className = '' } = props
  return (
    <Provider>
      <div className={className}>{props.children}</div>
    </Provider>
  )
}
function Aside(props: PropsWithClassname) {
  const { visable } = useContext(LayoutContext)
  const { className = '' } = props

  return <div className={`${className} ${visable ? '' : 'hidden'}`}>{props.children}</div>
}

function Handler(props: PropsWithClassname) {
  const { visable, setVisable } = useContext(LayoutContext)

  const { className = '', children } = props

  return (
    <span className={className} onClick={() => setVisable(!visable)}>
      {visable ? children[0] : children[1]}
    </span>
  )
}

BaseLayout.Aside = Aside
BaseLayout.Handler = Handler

export default BaseLayout
