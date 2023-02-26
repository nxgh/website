import { PropsWithChildren } from 'react'
import style from './index.module.scss'

export default function Layout(props: PropsWithChildren<{ className: string }>) {
  return <div className={`${style.interactiveLayout} w-full h-full px-5`}>{props.children}</div>
}
