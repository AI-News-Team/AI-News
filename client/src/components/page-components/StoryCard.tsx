import { Link } from "react-router-dom";

var cardStyle = {
    backgroundImage: `url(${Image})`
}

type Story = {
    name: string,
    author: string,
    body: string,
    source_url: string,
    cover_url: string,
    category: string
}

type Props = {
    title: string,
    image: string,
    body: string
  };

const StoryCard = ({ image, title, body }: Props) => {
    return <div className="w-[31%] mt-5 h-80">
        <Link to="/news" ><img src={image} alt="" className='object-cover h-4/5 w-full' /></Link>
        <div className="bg-white p-2 border">
            <h3 className='font-bold'>{title}</h3>
        </div>
    </div>
}

export default StoryCard