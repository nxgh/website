import fs from 'fs'
import path from 'path'

import { FC, PropsWithChildren,  useState } from 'react'
import type { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'

import { FileReturnType } from 'src/utils'
import color from 'src/utils/color'
import { filterMeta, readFileFn } from 'src/utils/read-file'

const Search: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [search, setSearch] = useState('')
  return (
    <div className="flex text-2xl shadow font-200 focus-within:shadow-lg">
      <input
        aria-label="Type to explore"
        placeholder="Search..."
        type="text"
        autoComplete="off"
        className="!outline-none text-2xl px-6 py-4 w-full border-none bg-transparent "
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <button onClick={(e) => setSearch('')} className={`w-10 pr-5 ${search ? '' : 'hidden'}`}>
        X
      </button>
    </div>
  )
}

function getWorldloud(files: FileReturnType[]) {
  return Array.from(
    new Set(
      files
        .map((i) => i.meta.key)
        .flat(Infinity)
        .filter((i) => i)
    )
  )
}
const WordCloud = ({ words, onClick }: { words: string[]; onClick?: (word: string[]) => void }) => {
  const [selected, setSelected] = useState<string[]>([])

  const _onClick = (word: string) => {
    let newSelected = selected.includes(word) ? selected.filter((i) => i !== word) : [...selected, word]
    setSelected(newSelected)
    onClick && onClick(newSelected)
  }

  return (
    <div className="w-full pt-10 flex-1">
      {words.map((i, index) => (
        <span
          style={{
            background: `${Object.values(color)[index + 1]}`,
          }}
          className={`font-loveisfree tracking-wide text-2xl m-2 px-6 py-2 inline-flex rounded-3xl cursor-pointer ${
            selected.includes(i) ? 'text-3xl' : 'text-2xl'
          }`}
          onClick={() => _onClick(i)}
          key={i}
        >
          <p className="text-white">{i}</p>
        </span>
      ))}
    </div>
  )
}

const Home: NextPage<{ files: FileReturnType[] }> = ({ files }) => {
  const router = useRouter()

  const [selected, setSelected] = useState<FileReturnType[]>([...files])

  function setSelectedFiles(selectedWords: string[]) {
    if (selectedWords.length === 0) {
      return setSelected(files)
    }
    const _s = files.filter((file) => {
      return selectedWords.every((word) => {
        return (file.meta.key && file.meta.key.includes(word)) || file.title.includes(word)
      })
    })
    setSelected(_s)
  }

  return (
    <div className="w-full h-full flex p-5 overflow-hidden">
      <section className="flex flex-col w-[50%] h-full px-4 pt-5">
        <Search />
        <WordCloud words={getWorldloud(files)} onClick={(e) => setSelectedFiles(e)} />
      </section>
      <section className="w-[50%] h-full overflow-auto">
        <div>
          {selected.map((i, index) => {
            const title = i.title.replace(/\.mdx?/, '')
            return (
              <div
                className="font-loveisfree tracking-wide text-3xl p-3 border-b-1 cursor-pointer hover:bg-gray-100"
                key={`${i.dir}-${i.title}-${index}`}
                onClick={() => router.push(`/n/${title}`)}
              >
                {title}
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const files = readFileFn('/notes', (params) => {
    const file = fs.readFileSync(path.join(params.__path, params.filename), 'utf-8')
    return {
      dir: params.dir,
      title: params.filename,
      meta: filterMeta(file),
    }
  })

  return { props: { files } }
}

export default Home
