import { createContext, PropsWithChildren, useContext, useState } from 'react'

type TabKey = string | number

const TabsContext = createContext<{
  selected: TabKey
  setSelected: (selected: TabKey) => void
}>({
  selected: '',
  setSelected: () => {},
})

function Provider(props: PropsWithChildren<{ defaultSelected: TabKey }>) {
  const [selected, setSelected] = useState<TabKey>(props.defaultSelected || '')

  return <TabsContext.Provider value={{ selected, setSelected }}>{props.children}</TabsContext.Provider>
}

function TabGroup(props: PropsWithChildren<{ defaultActived: TabKey; className?: string }>) {
  return <Provider defaultSelected={props.defaultActived}>{props.children}</Provider>
}

function Panels(props: PropsWithChildren) {
  return <>{props.children}</>
}
function Panel(props: PropsWithChildren<{ id: TabKey; className?: string }>) {
  const { selected } = useContext(TabsContext)
  const { className = '' } = props
  return <div className={`${className} ${selected === props.id ? '' : 'hidden'} `}>{props.children}</div>
}

function Labels(props: PropsWithChildren) {
  return <>{props.children}</>
}
function LabelItem(props: PropsWithChildren<{ id: TabKey; className?: string }>) {
  const { className = '' } = props
  const { setSelected } = useContext(TabsContext)
  return (
    <span className={`${className}`} onClick={() => setSelected(props.id)}>
      {props.children}
    </span>
  )
}

TabGroup.Labels = Labels
TabGroup.LabelItem = LabelItem
TabGroup.Panels = Panels
TabGroup.Panel = Panel

export default TabGroup
