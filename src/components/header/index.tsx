import { useState } from 'react'
import { useTheme } from 'src/utils'

export type LayoutType = 'default' | 'refs' | 'ppt'

function ThemeComponent() {
  const { setTheme } = useTheme()
  return (
    <span
      onClick={() => setTheme()}
      className="inline-flex font-missaluncialebricks text-2xl px-1 cursor-pointer ml-5"
      title="Theme"
    >
      T
    </span>
  )
}

function LayoutChangeComponent(props: { layout: LayoutType; changeLayout: (layout: LayoutType) => void }) {
  return (
    <div>
      {(['default', 'refs', 'ppt'] as const).map((i) => {
        return (
          <span
            onClick={() => props.changeLayout(i)}
            key={i}
            className={`${
              props.layout === i ? 'font-missaluncialebricks' : 'font-missaluncialemaster'
            } inline-flex text-2xl px-1 cursor-pointer`}
            title={i}
          >
            {i[0]}
          </span>
        )
      })}
    </div>
  )
}

export default function Header(props: {
  layout: LayoutType
  changeLayout: (layout: LayoutType) => void
  changeToc: () => void
}) {
  return (
    <header className="header flex items-center justify-between border-b-1 py-2 sticky top-0">
      <span onClick={() => props.changeToc()} className="toc-switch font-missaluncialemaster cursor-pointer">
        Toc
      </span>
      <div className="flex">
        <LayoutChangeComponent {...props} />
        <ThemeComponent />
      </div>
    </header>
  )
}

export function addDataset(el: HTMLElement, data: Record<string, any>) {
  for (const key in data) {
    el.dataset[key] = data[key]
  }
}

export function useHeader() {
  const [layout, setLayout] = useState<LayoutType>('default')

  return {
    layout,
    changeLayout: setLayout,
  }
}
