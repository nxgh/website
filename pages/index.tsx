import type { NextPage } from 'next'

const Menu = [
  {
    title: 'Three.js',
    path: '/threejs',
  },
]

const Home: NextPage = () => {
  return (
    <div>
      {Menu.map((item) => (
        <div className="text-red cursor-pointer" key={item.path}>
          <h2 onClick={() => {}}>{item.title}</h2>
        </div>
      ))}
    </div>
  )
}

export default Home
