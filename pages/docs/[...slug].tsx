// import React, { PropsWithChildren, useEffect, useState } from 'react'
// import { GetStaticPaths, GetStaticProps } from 'next'

// import renderMDX from 'src/renderMDX'
// import getDir from 'src/getDir'
// import { MDXComponent } from 'src/components/MDXComponent'
// import { useRouter } from 'next/router'
// import { Row, Col } from 'antd'
// import SideBar from 'src/components/SideBar'

// export const getStaticPaths: GetStaticPaths = async () => {
//   const docsFile = await getDir('/docs')
//   const paths = docsFile.map((item) => ({
//     params: { slug: [item.filename] },
//   }))

//   return {
//     paths,
//     fallback: false,
//   }
// }

// export const getStaticProps: GetStaticProps = async (context) => {
//   const [id] = context.params!.slug!
//   const files = await getDir('/docs')
//   const mdxSource = files.find((item) => item.filename === id)
//   const allPostsData = files.map((item) => ({ id: item.filename, title: item.filename }))

//   const previewSource = await renderMDX(mdxSource?.content!, { toc: false })
//   return {
//     props: {
//       previewSource: previewSource.code,
//       allPostsData,
//       id,
//     },
//   }
// }

// export default function Layout({
//   previewSource,
//   allPostsData,
// }: PropsWithChildren<{
//   previewSource: string
//   allPostsData: { id: string; title: string }[]
// }>) {
//   const handleScroll: React.UIEventHandler<HTMLDivElement> = (event) => {
//     const headers = [...Array(6).keys()].flatMap((i) => Array.from(document.querySelectorAll(`h${i + 1}`)))
//     const id = headers.reduce((nodeItem, item, index) => {
//       if (!nodeItem) nodeItem = item
//       if (Math.abs(nodeItem.getBoundingClientRect().top) > Math.abs(item.getBoundingClientRect().top)) nodeItem = item
//       return nodeItem
//     }).id

//     Array.from(document.querySelectorAll(`.toc-link`)).map((item) => {
//       return id && decodeURI((item as any)?.hash) === `#${id}`
//         ? item.classList.add('toc-link-active')
//         : item.classList.remove('toc-link-active')
//     })
//   }

//   return (
//     <Row className="flex w-full h-full overflow-x-hidden" onScroll={handleScroll}>
//       <Col span={4}>
//         <SideBar postData={allPostsData} />
//       </Col>
//       <Col span={20}>
//         <main className="mdxRender" style={{ margin: '20px' }}>
//           <MDXComponent code={previewSource} />
//         </main>
//       </Col>
//     </Row>
//   )
// }
