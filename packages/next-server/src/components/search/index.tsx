import { FC, PropsWithChildren, useState } from 'react'

const Search: FC<{
  onChange: (value: string) => void
  className?: string
  inputClassName?: string
  size?: 'large' | 'middle' | 'small'
}> = ({ onChange, className, inputClassName, size = 'middle' }) => {
  const [search, setSearch] = useState('')

  const presetClass = {
    large: 'text-3xl px-6 py-4',
    middle: '',
    small: 'text-sm',
  }

  return (
    <div className={`w-full inline-flex shadow focus-within:shadow-lg dark:shadow-blue-100 ${className}`}>
      <input
        aria-label="Type to explore"
        placeholder="Search..."
        type="text"
        autoComplete="off"
        className={`!outline-none w-full border-none bg-transparent font-loveisfree ${presetClass[size]} ${inputClassName} `}
        onChange={(e) => {
          setSearch(e.target.value)
          onChange(e.target.value)
        }}
        value={search}
      />
      <button onClick={(e) => setSearch('')} className={`w-10 pr-5 ${search ? '' : 'hidden'}`}>
        X
      </button>
    </div>
  )
}

export default Search
