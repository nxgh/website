import path from 'path'
import fs from 'fs'

import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'

export default function BlogIndex({ paths }: { paths: string[] }) {
  const router = useRouter()

  return (
    <div className="full flex-center">
      <div>
        {paths.map((i) => (
          <p style={{ cursor: 'pointer' }} onClick={() => router.push(`/blog/${i}`)} key={i}>
            {i}
          </p>
        ))}
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const postsDirectory = path.join(process.cwd(), '/pages/blog')

  const fileNames = fs.readdirSync(postsDirectory)

  const paths = fileNames.filter((fileNames) => fileNames.endsWith('.mdx')).map((i) => i.replace(/\.mdx$/, ''))

  return {
    props: {
      paths,
    },
  }
}
