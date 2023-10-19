import Headlines from "../components/page-components/Headlines"
import TopicSection from "../components/page-components/TopicSection";
import { useEffect, useState } from "react";
import { getData } from "../utils/axios";
import { Article } from "@shared";

type Topic = {
  category: string;
  description: string;
  color: string;
};

type Props = {
    topics: Topic[]
}

type Stories = {
    stories: Article[]
}

const Home = (props: Props) => {

    if (!localStorage.getItem("visited")) {
      localStorage.setItem("visited", "")
    }

    const news:string = "news"

    const [data, setData] = useState<any>();
    const [headlines, setHeadlines] = useState<any>();
            
        useEffect(() => {
            getData('article.summary', setData)
            getData('article.list', setHeadlines)
          },[])
          console.log(data)
        
    return (
      <div className="px-3 mt-12 md:mt-12">
        <Headlines stories={data?.news} />
        {props.topics?.map((topic) => (
          <TopicSection
            key={topic.category}
            topic={topic.category}
            color={topic.color}
            stories={data?.[topic.category]}
          />
        ))}
      </div>
    );
}

export default Home