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
import { useState, useEffect } from 'react';
import { getData } from './utils/axios';

function App() {

  const [categories, setCategories] = useState<any>();

  const topics = [
    "news",
    "gardening",
    "politics",
    "business",
    "culture",
    "world",
    "style",
    "health",
    "weather",
    "opinions",
    "entertainment",
    "tech",
    "food",
    "sport",
  ];

  useEffect(() => {
    getData("category.list", setCategories);
  }, []);

  // const test = categories.map((x: any) => )

  const topicDetails: Topic[] = categories?.filter((category: any) => {
    if (topics.includes(category.category)) {
      return category;
    }
  })

  type Topic = {
    category: string;
    description: string;
    color: string;
  };

  console.log(topicDetails)

  return (
    <div className="flex flex-col min-h-screen">
      <div className="hidden lg:block">
        <NavBar topics={topics} />
      </div>
      <div className="lg:hidden">
        <MobileNav topics={topics} />
      </div>
      <div className="xl:w-[80em] mx-auto py-10">
        <Routes>
          <Route path="/" element={<Home topics={topicDetails} />} />
          {topicDetails?.map((x) => (
            <Route
              key={x.category}
              path={`/${x.category}`}
              element={<TopicPage topic={x.category} color={x.color} />}
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
