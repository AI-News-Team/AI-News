import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import NavBar from './components/nav/NavBar'
import { Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import TopicPage from './pages/TopicPage'
import Topic2 from './pages/Topic2'
import colors from './styles/colors'

function App() {

  const topics = ["sport", "politics", "world"]

  const topicDetails = colors.filter(color => {
    if (topics.includes(color.topic)) {
      return color
    }
  })

  return (
    <>
      <NavBar topics={topics}/>
      <div className='w-[80em] mx-auto py-10'>
        <Routes >
          <Route path="/" element={<Home />} />
          {topicDetails.map(x => <Route path={`/${x.topic}`} element={<TopicPage topic={x.topic} color={x.color}/>} />)}
        </Routes>
      </div>
    </>
  )
}

export default App
