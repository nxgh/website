import { useState, useEffect } from 'react'

function Nav() {
  const [nav, setNav] = useState<string>('')

  useEffect(() => {
    const __nav = document.querySelector('nav.toc')
    if (__nav) setNav(__nav.innerHTML)
  }, [])

  return <div dangerouslySetInnerHTML={{ __html: nav }}></div>
}

export default Nav
