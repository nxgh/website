import path from 'path'
import fs from 'fs'

import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'

const paths = [
  { path: 'fundamentals', title: 'Three.js 开始' },
  { path: 'basic-components', title: 'Three.js 基础组件' },
  { path: 'camera', title: 'Three.js 摄像机' },
  { path: 'light', title: 'Three.js 灯光' },
  { path: 'material', title: 'Three.js 材质' },
]

export default function BlogIndex() {
  const router = useRouter()

  return (
    <div className="full flex-center">
      <div>
        {paths.map((i) => (
          <h2 style={{ cursor: 'pointer' }} onClick={() => router.push(`/three/${i.path}`)} key={i.path}>
            {i.title}
          </h2>
        ))}
      </div>
    </div>
  )
}
