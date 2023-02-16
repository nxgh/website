import style from './index.module.scss'
export default function Layout(props) {

  return <div className={`${style.cheatSheet} full overflow-auto`}>{props.children}</div>
}
