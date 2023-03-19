import Menu from './doc-list'
import Nav from './nav'
import Tabs from 'src/components/tabs'

export default function Aside() {
  return (
    <div className="flex flex-col w-1/5">
      <Tabs defaultActived="menu">
        <div className='w-full bg-red-100'>
          <Tabs.LabelItem id="menu">文档</Tabs.LabelItem>
          <Tabs.LabelItem id="nav">导航</Tabs.LabelItem>
        </div>
        <>
          <Tabs.Panel id="menu">
            <Menu />
          </Tabs.Panel>
          <Tabs.Panel id="nav">
            <Nav />
          </Tabs.Panel>
        </>
      </Tabs>
    </div>
  )
}
