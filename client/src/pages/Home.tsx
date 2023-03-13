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
    const [sport, setSport] = useState<any>();
    const [world, setWorld] = useState<any>();
    const [politics, setPolitics] = useState<any>();
        
        const getData = async () => {
            try {
                const response = await axios.get("http://localhost:3002/article.list");
                console.log(response.data.data)
                setData(response.data.data)
                    const sortData = (data: Story[]) => {
                        data.forEach(story => {
                            console.log(story)
                            switch (story.category) {
                                case "sport":
                                    setSport([...sport, story])
                                    break;
                                case "politics":
                                    setPolitics([...politics, story])
                                    break;
                                case "world":
                                    setWorld([...world, story])
                                    break;
                            
                                default:
                                    break;
                            }
                        });
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }
            
            useEffect(() => {
                getData()
                // sortData(data)
            },[])
            
            console.log(sport)
            console.log(world)
            console.log(politics)

        
        console.log(data)
    return (
    <>
        <Headlines />
        {props.topics.map(topic =>  <TopicSection topic={topic.topic} color={topic.color} stories={data}/>)}
    </>
    )
}

export default Home