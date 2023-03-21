import { useState, useEffect } from "react";
import { getData } from "../../utils/axios";
import CompactStoryCard from "./CompactStoryCard";

const domain = import.meta.env.VITE_SERVER_DOMAIN;
const allArticles = `${domain}article.list`;

type Story = {
  id: number;
  name: string;
  author: string;
  body: string;
  source_url: string;
  cover_url: string;
  category: string;
};

type Props = {
  color: string
};

const LeadingSidebar = ({ color }: Props) => {

    const [data, setData] = useState<Story[]>();

    const leadingStories = data?.slice(0, 5);

    useEffect(() => {
      getData(allArticles, setData);
    }, []);

  return (
    <>
      <div className="flex flex-col items-center">
        <h2 style={{ color: color, borderBottom: `1px solid ${color}`}} className="border-b w-full p-2 mb-5 text-white text-center ">
          LEADING STORIES
        </h2>
        {leadingStories?.map((story) => (
          <CompactStoryCard
            id={story.id}
            image={story.cover_url}
            title={story.name}
          />
        ))}
      </div>
    </>
  );
};

export default LeadingSidebar;
