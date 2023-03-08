import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import NavBar from './components/nav/NavBar'
import { Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import Topic1 from './pages/Topic1'
import Topic2 from './pages/Topic2'

function App() {

  return (
    <>
      <NavBar />
      <div>
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="/topic1" element={<Topic1 />} />
          <Route path="/topic2" element={<Topic2 />} />
        </Routes>
      </div>
    </>
  )
}

export default App
