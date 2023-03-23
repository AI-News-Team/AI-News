import React, { useEffect } from "react"
import { useState } from "react";
import axios from "axios";
import StoryCard from "../components/page-components/StoryCard";
import { getData } from "../utils/axios";

const domain = import.meta.env.VITE_SERVER_DOMAIN
const currentDomain=`${domain}article.list`

type Props = {
    topic: string,
    color: string
  };

const TopicPage = ({ topic, color }: Props) => {

    const [data, setData] = useState<any[]>([])
    const [storiesFilterd, setStoriesFilterd] = useState<any[]>([]);

    useEffect(() => {
        getData(currentDomain, setData)

    },[])

    useEffect(() => {
        const stories = data?.filter((story) => {
          return story.cover_url;
        });
        setStoriesFilterd(stories)
    }, [data])

    return (
      <>
        <h2 className="pt-10 font-bold" style={{ color: color }}>
          {topic.toUpperCase()}
        </h2>
        <hr
          style={{ background: color }}
          className="h-px bg-gray-200 border-0 dark:bg-gray-700 mb-12"
        ></hr>
        <div className="flex justify-between flex-wrap gap-y-10">
          {storiesFilterd?.map((story) => (
            <StoryCard
              id={story.id}
              image={story.cover_url}
              title={story.name}
              body={story.body}
            />
          ))}
        </div>
      </>
    );
}

export default TopicPage