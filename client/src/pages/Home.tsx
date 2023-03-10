import React from "react"
import Headlines from "../components/page-components/Headlines"
import StoryCard from "../components/page-components/StoryCard";
import { Link } from "react-router-dom"
import TopicSection from "../components/page-components/TopicSection";

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
        {props.topics.map(topic =>  <TopicSection topic={topic.topic} color={topic.color}/>)}
    </>
    )
}

export default Home