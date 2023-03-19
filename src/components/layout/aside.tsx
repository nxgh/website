import { PropsWithChildren, useState } from 'react'
import style from './index.module.scss'
import { useRouter } from 'next/router'
import type { FileList } from 'src/components/files'

const Menu = (props: { fileList: FileList }) => {
  const router = useRouter()

  return (
    <section className="h-full overflow-auto pt-5">
      <div>
        {props.fileList.map((i, index) => {
          const title = i.title.replace(/\.mdx?/, '')
          return (
            <div
              className="font-loveisfree tracking-wide text-xl cursor-pointer"
              key={`${i.dir}-${i.title}-${index}`}
              onClick={() => router.push(`${title}`)}
            >
              {title}
            </div>
          )
        })}
      </div>
    </section>
  )
}

const filterTags = (fileList: FileList) =>
  fileList.reduce<string[]>(
    (arr, item) => Array.from(new Set([...arr, ...(item.meta?.key || []), ...(item.meta?.tags || [])])),
    []
  )

const Tags = ({
  fileList,
  className,
  onClick,
}: {
  fileList: FileList
  onClick?: (word: string[]) => void
  className?: string
}) => {
  const tags = filterTags(fileList)

  const [selected, setSelected] = useState<string[]>([])
  const [files, setFiles] = useState<FileList>([])

  const _onClick = (word: string) => {
    let newSelected = selected.includes(word) ? selected.filter((i) => i !== word) : [...selected, word]
    setSelected(newSelected)
    setSelectedFiles(newSelected)
  }

  function setSelectedFiles(selectedWords: string[]) {
    if (selectedWords.length === 0) {
      return setFiles([])
    }
    const _s = fileList.filter((file) => {
      return selectedWords.every((word) => {
        return (
          (file.meta.tags && file.meta.tags.includes(word)) ||
          (file.meta.key && file.meta.key.includes(word)) ||
          file.title.includes(word)
        )
      })
    })
    setFiles(_s)
  }

  return (
    <div className={`${className} w-full h-full`}>
      <div className="w-full pt-10">
        {tags.map((i, index) => (
          <span
            className={`font-loveisfree tracking-wide border m-1 px-2  inline-flex rounded-sm cursor-pointer ${
              selected.includes(i) ? 'bg-gray-100 ' : ''
            }`}
            onClick={() => _onClick(i)}
            key={i}
          >
            {i}
          </span>
        ))}
      </div>
      <Menu fileList={files} />
    </div>
  )
}

const Aside = ({
  onSideChange,
  fileList,
}: PropsWithChildren<{
  onSideChange?: (visible: boolean) => void
  fileList: FileList
}>) => {
  const SIDE_VALUE = ['Menu', 'Nav', 'Tags'] as const

  const [sideBarVisible, setSideBarVisible] = useState(true)
  const [sideMenu, setSideMenu] = useState<typeof SIDE_VALUE[number]>(SIDE_VALUE[0])
  const [nav, setNav] = useState<Element | null>(null)

  function itemOnClick(id: typeof SIDE_VALUE[number]) {
    if (id === 'Nav') {
      const __nav = document.querySelector('nav')
      if (__nav) setNav(__nav)
    }

    if (sideMenu === id && sideBarVisible) {
      setSideBarVisible(false)
    }
    if (sideMenu !== id) {
      setSideBarVisible(true)
    }
    if (sideMenu === id && !sideBarVisible) {
      setSideBarVisible(true)
    }

    // if (sideMenu === id) {
    // setSideBarVisible(!sideBarVisible)
    // }

    // onSideChange(!sideBarVisible)
    setSideMenu(id)
  }

  const baseClassName = 'font-missaluncialebricks text-3xl cursor-pointer h-[3vw]'

  return (
    <aside
      className={`h-full flex transition-all duration-150 ${
        sideBarVisible ? 'w-[30vw] max-w-[30vw]' : 'w-[3vw]'
      }`}
    >
      <div className="w-[3vw] min-w-[3vw] h-full flex flex-col justify-start items-center pt-5">
        {SIDE_VALUE.map((item) => {
          return (
            <span key={item} className={baseClassName} onClick={() => itemOnClick(item)}>
              {item[0]}
            </span>
          )
        })}
      </div>
      <div className={`px-2 overflow-x-hidden ${sideBarVisible ? 'w-full' : ' w-0'}`}>
        {sideMenu === 'Menu' && <Menu fileList={fileList} />}
        {sideMenu === 'Nav' && nav && (
          <div className={`${style.nav} `} dangerouslySetInnerHTML={{ __html: nav.innerHTML }}></div>
        )}
        {sideMenu === 'Tags' && <Tags className={`${sideBarVisible ? '' : 'hidden'}`} fileList={fileList} />}
      </div>
    </aside>
  )
}

export default Aside
