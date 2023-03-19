import Link from 'next/link'
import { useState, useCallback, useEffect } from 'react'

function Aside() {
  const [data, setData] = useState([])

  const fetchPosts = useCallback(async () => {
    const data = await fetch('/api/blog/list')
    const json = await data.json()
    setData(json.data)
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <aside>
      {data &&
        data.map((item) => {
          return (
            <div key={item.path}>
              <Link href={'/blog/' + item.path}>{item.title}</Link>
            </div>
          )
        })}
    </aside>
  )
}

export default Aside
