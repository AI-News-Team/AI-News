import { Link } from "react-router-dom";

type Props = {
    title: string,
    image: string,
    body: string
  };

const StoryCard = ({ image, title, body }: Props) => {
    return (
        <div className="w-[31%] mt-5 h-80">
            <Link to="/news" ><img src={image} alt="" className='object-cover h-72 w-full' /></Link>
            <div className="bg-white p-2 border-l-2 border-r-2 border-b-2 h-14">
                <h3 className='font-bold'>{title}</h3>
            </div>
        </div>
    )
}

export default StoryCard