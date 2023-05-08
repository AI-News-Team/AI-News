import './App.css'
import NavBar from './components/nav/NavBar'
import MobileNav from "./components/nav/MobileNav";
import Footer from './components/footer/Footer'
import { Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import TopicPage from './pages/TopicPage'
import colors from './styles/colors'
import ArticlePage from './pages/ArticlePage'
import Search from './pages/Search';

function App() {

  const topics = ["news", "gardening", "motoring", "politics", "business", "culture" ,"world", "sport"]

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
    <div className="flex flex-col min-h-screen">
      <div className="hidden lg:block">
        <NavBar topics={topics} />
      </div>
      <div className="lg:hidden">
        <MobileNav topics={topics}/>
      </div>
      <div className="xl:w-[80em] mx-auto py-10">
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
          <Route path="/search/:search" element={<Search />} />
        </Routes>
      </div>
      <Footer topics={topics} />
    </div>
  );
}

export default App
