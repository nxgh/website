import Link from 'next/link'
import { GlobalContext } from 'pages/_app'
import { useState, useEffect, memo, useMemo, useCallback, useContext } from 'react'

function DocLayout({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState([])

  console.log('doc render')

  const fetchPosts = useCallback(async () => {
    const data = await fetch('/api/blog/list')
    const json = await data.json()
    setData(json.data)
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <section>
      {data &&
        data.map((item) => {
          return (
            <div key={item.path}>
              <Link href={'/blog/' + item.path}>{item.name}</Link>
            </div>
          )
        })}
      {children}
    </section>
  )
}

export default memo(DocLayout)
