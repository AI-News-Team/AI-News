import StoryCard from "./StoryCard";
import { Link } from "react-router-dom";
import { Article } from "@shared";

type Props = {
  topic: string;
  color: string;
  stories: Article[];
};

const TopicSection = ({ topic, color, stories }: Props) => {
  return (
    <>
      <h2 className="pt-10 flex" style={{ color: color }}>
        <Link to={`/${topic}`}>{topic.toUpperCase()}</Link>
      </h2>
      <hr style={{ background: color }} className="h-[1px] border-0"></hr>
      <div className="md:flex justify-between pt-5 md:pt-10">
        {stories?.map((story) => (
          <StoryCard
            key={story.id}
            id={story.id}
            image={story.cover_url}
            title={story.name}
            body={story.body}
          />
        ))}
      </div>
    </>
  );
};

export default TopicSection;
