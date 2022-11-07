import { Menu } from 'antd'
import { useRouter } from 'next/router'
import style from './index.module.css'

export default function SideBar({ postData }: { postData: { id: string; title: string }[] }) {
  const router = useRouter()
  return (
    <Menu
      style={{ height: '100%' }}
      items={postData.map((i) => ({ label: i.id, key: i.id }))}
      onClick={({ key }) => router.push(`/docs/${key}`)}
    />
    // <aside className={`${style.sidebar} full`}>
    //   <ul className="full" style={{ listStyle: 'none', paddingInlineStart: 0, padding: '0 10px' }}>
    //     {postData.map((item) => (
    //       <li
    //         key={item.id}
    //         className={`${style.link} ${router.asPath === `/docs/${item.id}` ? `${style.link_select} ` : ''}`}
    //       >
    //         {item.title}
    //       </li>
    //     ))}
    //   </ul>
    // </aside>
  )
}
