import { useState } from 'react'
import type { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'

// import { FileReturnType } from 'src/utils'
// import { ThemeComponent } from 'src/components/header'
// import Search from 'src/components/search'
// import Tags from 'src/components/tags'

// import { generateMeta } from 'mdx'

// const getTags = (files: FileReturnType[]) =>
//   Array.from(
//     new Set(
//       files
//         .map((i) => i.meta.key)
//         .flat(Infinity)
//         .filter((i) => i)
//     )
//   )

// const Home: NextPage<{ files: FileReturnType[] }> = ({ files }) => {
//   const router = useRouter()

//   const [selected, setSelected] = useState<FileReturnType[]>([...files])

//   function setSelectedFiles(selectedWords: string[]) {
//     if (selectedWords.length === 0) {
//       return setSelected(files)
//     }
//     const _s = files.filter((file) => {
//       return selectedWords.every((word) => {
//         return (file.meta.key && file.meta.key.includes(word)) || file.title.includes(word)
//       })
//     })
//     setSelected(_s)
//   }

//   return (
//     <div className="w-full h-full flex p-5 overflow-hidden">
//       <section className="flex flex-col w-[50%] h-full px-4 pt-5">
//         <div className="flex justify-end">
//           <ThemeComponent />
//         </div>
//         <Search onChange={(value) => {}} size="large" />
//         <Tags tags={getTags(files)} onClick={(e) => setSelectedFiles(e)} />
//       </section>
//       <section className="w-[50%] h-full overflow-auto">
//         <div>
//           {selected.map((i, index) => {
//             const title = i.title.replace(/\.mdx?/, '')
//             return (
//               <div
//                 className="font-loveisfree tracking-wide text-3xl p-3 border-b-1 cursor-pointer light:hover:bg-gray-100 dark:hover:bg-gray-800"
//                 key={`${i.dir}-${i.title}-${index}`}
//                 onClick={() => router.push(`/n/${title}`)}
//               >
//                 {title}
//               </div>
//             )
//           })}
//         </div>
//       </section>
//     </div>
//   )
// }

// export const getStaticProps: GetStaticProps = async () => {
//   const files = GenerateMeta()

//   return { props: { files } }
// }

const Home: NextPage = () => {
  return <div>hello</div>
}

export async function getStaticProps() {
  const content = null
  // if (!content) {
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: '/n/',
  //     },
  //   }
  // }
  return {
    props: {},
  }
}

export default Home
