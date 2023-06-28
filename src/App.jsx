import React from 'react'
import Home from './Components/Home/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Details from './Components/Details/Details'
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/details/:id' element={<Details/>}/>
      </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
