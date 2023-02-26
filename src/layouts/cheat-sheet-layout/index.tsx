import style from './index.module.scss'
export default function Layout(props) {

  return <div className={`${style.cheatSheet} w-full h-full`}>{props.children}</div>
}
