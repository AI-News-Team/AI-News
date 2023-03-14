import React from "react"
import Headlines from "../components/page-components/Headlines"
import StoryCard from "../components/page-components/StoryCard";
import { Link } from "react-router-dom"
import TopicSection from "../components/page-components/TopicSection";
import { useEffect, useState } from "react";
import axios from "axios";

type Topic = {
    topic: string,
    color: string
  };

type Props = {
    topics: Topic[]
}

type Stories = {
    stories: Story[]
}

type Story = {
    name: string,
    author: string,
    body: string,
    source_url: string,
    cover_url: string,
    category: string
}

const Home = (props: Props) => {

    const [data, setData] = useState<any>();
        
        const getData = async () => {
            try {
                const response = await axios.get("http://localhost:3002/article.list");
                setData(response.data.data)
                }
                catch (error) {
                    console.log(error);
                }
            }
            
        useEffect(() => {
            getData()
        },[])
        
    return (
    <>
        <Headlines stories={data}/>
        {props.topics.map(topic =>  <TopicSection topic={topic.topic} color={topic.color} stories={data}/>)}
    </>
    )
}

export default Home