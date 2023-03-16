import React from "react"
import Headlines from "../components/page-components/Headlines"
import { Link } from "react-router-dom"
import TopicSection from "../components/page-components/TopicSection";
import { useEffect, useState } from "react";
import axios from "axios";
import { getData } from "../utils/axios";

const domain = import.meta.env.VITE_SERVER_DOMAIN
const currentDomain=`${domain}article.list`

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
    id: number,
    name: string,
    author: string,
    body: string,
    source_url: string,
    cover_url: string,
    category: string
}

const Home = (props: Props) => {

    const [data, setData] = useState<any>();
            
        useEffect(() => {
            getData(currentDomain, setData)
        },[])
        
        console.log(data)
        
    return (
    <>
        <Headlines stories={data}/>
        {props.topics.map(topic =>  <TopicSection key={topic.topic} topic={topic.topic} color={topic.color} stories={data}/>)}
    </>
    )
}

export default Home