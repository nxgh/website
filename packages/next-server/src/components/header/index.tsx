import { useRouter } from 'next/router'
import { useState } from 'react'
import useTheme from 'src/utils/use-theme'
import Modal from 'src/components/modal'
import Search from '../search'

export type LayoutType = 'default' | 'refs' | 'ppt'

export function ThemeComponent() {
  const { setTheme } = useTheme()
  return (
    <span
      onClick={() => setTheme()}
      className="inline-flex font-missaluncialebricks text-2xl px-1 cursor-pointer ml-5"
      title="切换主题"
    >
      T
    </span>
  )
}

function LayoutChangeComponent(props: { layout: LayoutType; changeLayout: (layout: LayoutType) => void }) {
  return (
    <div>
      {(['default', 'refs', 'ppt'] as const).map((i, index) => {
        return (
          <span
            onClick={() => props.changeLayout(i)}
            key={i}
            className={`${
              props.layout === i ? 'font-missaluncialebricks' : 'font-missaluncialemaster'
            } inline-flex text-2xl px-1 cursor-pointer`}
            title={['默认布局', '速查表', 'PPT'][index]}
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
  const router = useRouter()

  const [modalVisible, setModalVisible] = useState(false)

  return (
    <header className="header flex items-center justify-between border-b-1 py-2 sticky top-0">
      <div>
        <span
          title="Toc"
          onClick={() => props.changeToc()}
          className="toc-switch font-missaluncialemaster cursor-pointer mr-5"
        >
          Toc
        </span>
        <span
          title="Home"
          onClick={() => router.push('/')}
          className="toc-switch font-missaluncialemaster cursor-pointer mr-5"
        >
          Home
        </span>
        <span
          title="search"
          onClick={() => setModalVisible(true)}
          className="toc-switch font-missaluncialemaster cursor-pointer mr-5 text-gray-100"
        >
          Search
        </span>
      </div>

      <div className="flex">
        <LayoutChangeComponent {...props} />
        <ThemeComponent />
        <Modal
          visible={modalVisible}
          onCancel={() => {
            setModalVisible(false)
          }}
        >
          <div className="px-5 py-5 w-full h-full">
            <Search onChange={() => {}} size="large" />
          </div>
        </Modal>
      </div>
    </header>
  )
}

export function addDataset(el: HTMLElement, data: Record<string, any>) {
  for (const key in data) {
    el.dataset[key] = data[key]
  }
}

export function useHeader(props: LayoutType = 'default') {
  const [layout, setLayout] = useState<LayoutType>(props)

  return {
    layout,
    changeLayout: setLayout,
  }
}
