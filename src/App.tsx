import { Outlet } from 'react-router-dom'
import { RecoilRoot } from 'recoil'


function App() {
  return (
    <div className="w-full h-full">
      <RecoilRoot>
        <Outlet />
      </RecoilRoot>
    </div>
  )
}

export default App
