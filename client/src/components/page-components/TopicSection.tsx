import StoryCard from "./StoryCard"
import { Link } from "react-router-dom";


const img:string = "https://www.befunky.com/images/prismic/b60244c7-087b-409a-961b-831999aa5085_llama.jpg?auto=avif,webp&format=jpg&width=1920&height=1920&fit=bounds";

type Props = {
    topic: string,
    color: string,
    // img: string
  };

const TopicSection = ({topic, color}: Props) => {

    return <>
                                <h2 className="pt-10"style={{color: color}}><Link to={`/${topic}`}>{topic.toUpperCase()}</Link></h2>
                                <hr style={{background: color}} className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
                                <div className="flex justify-between">
                                    <StoryCard image={img}/>
                                    <StoryCard image={img}/>
                                    <StoryCard image={img}/>
                                </div>
    </>
}

export default TopicSection