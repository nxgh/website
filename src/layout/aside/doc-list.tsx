import Link from 'next/link'
import { useState, useCallback, useEffect } from 'react'

function Aside() {
  const [data, setData] = useState<
    {
      path: string
      title: string
    }[]
  >([])

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
            <div key={item.path} className="font-loveisfree hover:border-b my-2">
              <Link href={'/blog/' + item.path}>{item.title}</Link>
            </div>
          )
        })}
    </aside>
  )
}

export default Aside
