import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from './App'
import Flex from './view/flex-display'
import './index.css'
import 'uno.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Flex />} />
          <Route path="/flex" element={<Flex />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
