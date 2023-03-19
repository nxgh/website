import { PropsWithChildren } from 'react'
import style from './style.module.scss'

export default function MdxContent(props: PropsWithChildren) {
  return (
    <main className={`${style.MdxContent} w-full overflow-auto px-10 pt-10 pb-20 leading-loose`}>{props.children}</main>
  )
}
