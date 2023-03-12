import { useState } from 'react'

const Tags = ({ tags, onClick }: { tags: string[]; onClick?: (word: string[]) => void }) => {
  const [selected, setSelected] = useState<string[]>([])

  const _onClick = (word: string) => {
    let newSelected = selected.includes(word) ? selected.filter(i => i !== word) : [...selected, word]
    setSelected(newSelected)
    onClick && onClick(newSelected)
  }

  return (
    <div className='w-full pt-10 flex-1'>
      {tags.map((i, index) => (
        <span
          className={`font-loveisfree tracking-wide border m-2 px-6 py-2 inline-flex rounded-sm cursor-pointer text-xl ${
            selected.includes(i) ? 'bg-gray-100 ' : ''
          }`}
          onClick={() => _onClick(i)}
          key={i}>
          {i}
        </span>
      ))}
    </div>
  )
}

export default Tags
