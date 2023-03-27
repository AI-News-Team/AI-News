import './App.css'
import NavBar from './components/nav/NavBar'
import Footer from './components/footer/Footer'
import { Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import TopicPage from './pages/TopicPage'
import colors from './styles/colors'
import ArticlePage from './pages/ArticlePage'

function App() {

  const topics = ["news", "gardening", "sport", "motoring", "politics", "business", "culture" ,"world"]

  const topicDetails: Topic[] = colors.filter(color => {
    if (topics.includes(color.topic)) {
      return color
    }
  })

  type Topic = {
    topic: string,
    color: string
  };

  return (
    <>
      <NavBar topics={topics} />
      <div className="w-[80em] mx-auto py-10">
        <Routes>
          <Route path="/" element={<Home topics={topicDetails} />} />
          {topicDetails.map((x) => (
            <Route
              key={x.topic}
              path={`/${x.topic}`}
              element={<TopicPage topic={x.topic} color={x.color} />}
            />
          ))}
          <Route path="/article/:id" element={<ArticlePage />} />
        </Routes>
      </div>
      <Footer topics={topics} />
    </>
  );
}

export default App
