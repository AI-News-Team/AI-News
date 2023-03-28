import { Link } from "react-router-dom";

type Props = {
  id: number;
  title: string;
  image?: string;
  body: string[];
};

const StoryCard = ({ image, title, body, id }: Props) => {
  return (
    <div className="w-[31%] border">
      {image 
        ?<Link to={`/article/${id}`}>
        <img src={image} alt="" className="object-cover h-72 w-full" />
      </Link>
        :<Link to={`/article/${id}`}>
        <img src="https://icon-library.com/images/no-image-available-icon/no-image-available-icon-10.jpg" alt="" className="object-cover h-72 w-full" />
      </Link>
      }
      <div className="bg-white p-4 h-26 border-t">
        <Link to={`/article/${id}`}>
          <h3 className="font-bold leading-5">{title}</h3>
        </Link>
        <p className="line-clamp-2 text-gray-500 leading-5 mt-2">{body}</p>
      </div>
    </div>
  );
};

export default StoryCard;
