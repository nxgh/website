import { createContext, PropsWithChildren, ReactNode } from 'react'

const LayoutContext = createContext({})

const Header = ({ children }: PropsWithChildren) => {
  return <header className="h-[3vh] bg-green-100">{children}</header>
}

const Aside = ({ children }: PropsWithChildren) => {
  return (
    <aside className="w-[20vw] h-full bg-blue-100 flex">
      <div className="w-[5vw] h-full bg-purple-100 flex justify-center pt-5">
        <span className="font-missaluncialebricks text-3xl cursor-pointer">N</span>
      </div>
      <div className="bg-yellow-100 w-full">{children}</div>
    </aside>
  )
}

const Main = ({ children }: PropsWithChildren) => {
  return <main className="bg-gray-300 w-full h-[97vh]">{children}</main>
}

const Layout = (props: PropsWithChildren) => {
  const filterChildren = (children: ReactNode, type: typeof Header) => {
    if (children instanceof Array) {
      return children.find((child) => (child.type === type ? child : null))
    }
    return null
  }

  return (
    <LayoutContext.Provider value={{}}>
      <div className="layout w-full h-full bg-red-100">
        {filterChildren(props.children, Header)}
        <div className='w-full flex'>
          {filterChildren(props.children, Aside)}
          {filterChildren(props.children, Main)}
        </div>
      </div>
    </LayoutContext.Provider>
  )
}

const createLayout = () => {
  return {
    Layout,
    Header,
    Aside,
    Main,
  }
}
export default createLayout
