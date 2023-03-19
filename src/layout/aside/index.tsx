import Image from 'next/image'
import Menu from './doc-list'
import Nav from './nav'
import Tabs from 'src/components/tabs'
import { PropsWithClassname } from 'src/types'
// import FolderIcon from '/icons/folder.svg'

export default function Aside(props: PropsWithClassname) {
  const { className = '' } = props
  return (
    <div className={`flex flex-col w-full p-5 ${className}`}>
      <Tabs defaultActived="menu">
        <div className="w-full mb-5">
          <Tabs.LabelItem id="menu">
            <Image src="/icon/folder.svg" width={20} height={20} />
          </Tabs.LabelItem>
          <Tabs.LabelItem id="nav">
            <Image src="/icon/nav.svg" width={20} height={20} />
          </Tabs.LabelItem>
        </div>
        <div>
          <Tabs.Panel id="menu">
            <Menu />
          </Tabs.Panel>
          <Tabs.Panel id="nav">
            <Nav />
          </Tabs.Panel>
        </div>
      </Tabs>
    </div>
  )
}
