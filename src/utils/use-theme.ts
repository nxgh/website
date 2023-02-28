import { useEffect, useState } from 'react'

export default function useTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  function __setTheme() {
    const __theme = document.querySelector('html')!.dataset.theme
    setTheme(__theme === 'dark' ? 'light' : 'dark')
  }

  useEffect(() => {
    document.querySelector('html')!.dataset.theme = theme
  }, [theme])

  return { setTheme: __setTheme }
}
