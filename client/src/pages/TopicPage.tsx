import React, { useEffect } from "react"
import { useState } from "react";
import axios from "axios";
import StoryCard from "../components/page-components/StoryCard";
import { getData } from "../utils/axios";
import SortDropDown from "../components/tools/SortDropDown";
import { useSearchParams } from "react-router-dom";

const domain = import.meta.env.VITE_SERVER_DOMAIN

type Props = {
  topic: string,
  color: string
};

const TopicPage = ({ topic, color }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams({});
  
  const articleData=`${domain}article.list/${topic}`

    const [data, setData] = useState<any[]>([])

    useEffect(() => {
      setData([])
      getData(articleData, setData)
    },[topic])

    useEffect(() => {
      getData(articleData + document.location.search, setData);
    }, [document.location.search]);

    return (
      <>
      
        <h2 className="pt-10 font-bold" style={{ color: color }}>
          {topic.toUpperCase()}
        </h2>
        <hr
          style={{ background: color }}
          className="h-px bg-gray-200 border-0 dark:bg-gray-700"
        ></hr>
        <div className="flex w-full justify-end">
          <SortDropDown />
        </div>
        {data.length ? (
          <div className="flex justify-between flex-wrap gap-y-10 mt-10">
            {data?.map((story) => (
              <StoryCard
                key={story.id}
                id={story.id}
                image={story.cover_url}
                title={story.name}
                body={story.body}
              />
            ))}
          </div>
        ) : (
          <div>No {topic} stories currently available</div>
        )}
      </>
    );
}

export default TopicPage