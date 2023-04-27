import React from "react"
import Headlines from "../components/page-components/Headlines"
import { Link } from "react-router-dom"
import TopicSection from "../components/page-components/TopicSection";
import { useEffect, useState } from "react";
import axios from "axios";
import { getData } from "../utils/axios";
import { Article } from "@shared";

const domain = import.meta.env.VITE_SERVER_DOMAIN
const currentDomain=`${domain}article.summary`
const allArticlesDomain=`${domain}article.list`

type Topic = {
    topic: string,
    color: string
  };

type Props = {
    topics: Topic[]
}

type Stories = {
    stories: Article[]
}

const Home = (props: Props) => {

    const news:string = "news"

    const [data, setData] = useState<any>();
    const [headlines, setHeadlines] = useState<any>();
            
        useEffect(() => {
            getData(currentDomain, setData)
            getData(allArticlesDomain, setHeadlines)
        },[])
        
    return (
    <div className="px-3 md:p-0 mt-12">
        <Headlines stories={data?.news}/>
        {props.topics.map(topic =>  <TopicSection key={topic.topic} topic={topic.topic} color={topic.color} stories={data?.[topic.topic]}/>)}
    </div>
    )
}

export default Home