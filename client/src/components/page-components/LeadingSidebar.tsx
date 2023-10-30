import { useState, useEffect } from "react";
import { getData } from "../../utils/axios";
import CompactStoryCard from "./CompactStoryCard";
import { Article } from "ai-daily";

type Props = {
  color: string
  topic: string
};

type Topic = {
  topic: string,
  color: string
};

const LeadingSidebar = ({ color, topic }: Props) => {

    const [data, setData] = useState<any>();

    useEffect(() => {
      getData('article.summary', setData);
      
    }, []);

  return (
    <>
      <div className="flex flex-col items-center">
        <h2 style={{ color: color, borderBottom: `1px solid ${color}`}} className="border-b w-full p-2 mb-5 text-white text-center ">
          LEADING STORIES
        </h2>
        {data?.[topic]?.map((story: Article) => (
          <CompactStoryCard
            key={story.id}
            id={story.id}
            image={story?.image_gen ? `/article_images/${story.id}.png` : story.cover_url}
            title={story.name}
          />
        ))}
      </div>
    </>
  );
};

export default LeadingSidebar;
