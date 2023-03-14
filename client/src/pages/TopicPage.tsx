import React, { useEffect } from "react"
import { useState } from "react";
import axios from "axios";
import StoryCard from "../components/page-components/StoryCard";

type Props = {
    topic: string,
    color: string
  };

const TopicPage = ({ topic, color }: Props) => {

    const [data, setData] = useState<any[]>([])

    useEffect(() => {
        getData()
        // sortData(data)
    },[])

    console.log(data?.map)

    const getData = async () => {
        try {
            const response = await axios.get("http://localhost:3002/article.list");
            console.log(response.data.data)
            setData(response.data.data)
            }
            catch (error) {
                console.log(error);
            }
        }

    return (
         <>
        <h2 className="pt-10"style={{color: color}}>{topic.toUpperCase()}</h2>
        <hr style={{background: color}} className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <div className="flex justify-between">
            {data?.map((story) => <StoryCard image={story.cover_url} title={story.name} body={story.body}/>)}
        </div>
        </>
    )
}

export default TopicPage