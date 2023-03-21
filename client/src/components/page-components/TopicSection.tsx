import StoryCard from "./StoryCard";
import { Link } from "react-router-dom";

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
  topic: string;
  color: string;
  stories: Story[];
};

const TopicSection = ({ topic, color, stories }: Props) => {
  return (
    <>
      <h2 className="pt-10" style={{ color: color }}>
        <Link to={`/${topic}`}>{topic.toUpperCase()}</Link>
      </h2>
      <hr style={{ background: color }} className="h-[1px] border-0"></hr>
      <div className="flex justify-between pt-10">
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
