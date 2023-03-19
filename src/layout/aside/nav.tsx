import { useState, useEffect } from 'react'
import styles from './nav.module.scss'

function Nav() {
  const [nav, setNav] = useState<string>('')

  useEffect(() => {
    const __nav = document.querySelector('nav.toc')
    if (__nav) setNav(__nav.innerHTML)
  }, [])

  return <div className={styles.nav} dangerouslySetInnerHTML={{ __html: nav }}></div>
}

export default Nav
