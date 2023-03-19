import Image from 'next/image'
import RightArrow from '../public/icon/right-arrow.svg'

export default function Home() {
  return (
    <main className='full flex flex-col p-50 justify-center'>
      <div className='flex flex-col justify-center items-center p-50 mb-10'>
        <h1 className='red text-6xl font-mono mb-10'>Hello World!</h1>
        <a title='docs' href='/blog'>
          <Image width={150} src={RightArrow} alt='right-arrow'></Image>
        </a>
      </div>
    </main>
  )
}
