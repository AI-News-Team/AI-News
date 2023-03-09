import React from "react"
import Headlines from "../components/page-components/Headlines"
import StoryCard from "../components/page-components/StoryCard";
import { Link } from "react-router-dom"

type Topic = {
    topic: string,
    color: string
  };

type Props = {
    topics: Topic[]
}

const Home = (props: Props) => {

    return (
    <>
    <Headlines />
    {props.topics.map(topic =>  <div>
                                <h2 className="pt-10"style={{color: topic.color}}><Link to={`/${topic.topic}`}>{topic.topic.toUpperCase()}</Link></h2>
                                <hr style={{background: topic.color}} className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
                                <div className="flex justify-between">
                                    <StoryCard />
                                    <StoryCard />
                                    <StoryCard />
                                </div>
                            </div>)}
    </>
    )
}

export default Home