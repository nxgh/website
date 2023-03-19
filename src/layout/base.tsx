import { createContext, PropsWithChildren, useContext, useState } from 'react'

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

function BaseLayout(props: PropsWithChildren) {
  return (
    <Provider>
      <div className="flex">{props.children}</div>
    </Provider>
  )
}
function Aside(props: PropsWithChildren) {
  const { visable } = useContext(LayoutContext)

  return <div className={`${visable ? '' : 'hidden'}`}>{props.children}</div>
}

function Handler(props: PropsWithChildren) {
  const { visable, setVisable } = useContext(LayoutContext)
  return (
    <div>
      <button onClick={() => setVisable(!visable)}>{props.children}</button>
    </div>
  )
}

BaseLayout.Aside = Aside
BaseLayout.Handler = Handler

export default BaseLayout
