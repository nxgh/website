import Image from 'next/image'

import { useEffect, useState } from 'react'
import { PropsWithClassname } from 'src/types'

function useTheme(defaultTheme: 'dark' | 'light' = 'light') {
  const [theme, setTheme] = useState<'dark' | 'light'>(defaultTheme)

  function __setTheme(__theme: 'dark' | 'light') {
    const html = document.querySelector('html')
    html!.dataset.theme = __theme
    setTheme(__theme)
  }

  return { setTheme: __setTheme, theme }
}

export default function Theme(props: PropsWithClassname) {
  const { theme, setTheme } = useTheme('light')

  return (
    <div className={props.className}>
      {theme === 'dark' ? (
        <Image onClick={() => setTheme('light')} src="/icon/night.svg" width={20} height={20} />
      ) : (
        <Image onClick={() => setTheme('dark')} src="/icon/sun.svg" width={20} height={20} />
      )}
    </div>
  )
}
