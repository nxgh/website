import { useEffect, useState } from 'react'

export default function useTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  function __setTheme() {
    const html = document.querySelector('html')
    const __theme = html!.dataset.theme
    html?.className === 'dark' ? html!.classList.remove('dark') : html!.classList.add('dark')
    setTheme(__theme === 'dark' ? 'light' : 'dark')
  }

  return { setTheme: __setTheme }
}
