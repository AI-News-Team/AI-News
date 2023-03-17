import { Link } from "react-router-dom";

type Props = {
    id: number,
    title: string,
    image: string,
    body: string
  };

const StoryCard = ({ image, title, body, id }: Props) => {

    // console.log(id)

    return (
        <div className="w-[31%] pb-12">
            <Link to={`/article/${id}`} ><img src={image} alt="" className='object-cover h-72 w-full' /></Link>
            <div className="bg-white p-4 border-l-2 border-r-2 border-b-2 h-24">
                <h3 className='font-bold'>{title}</h3>
                <p className="truncate text-gray-500">{body}</p>
            </div>
        </div>
    )
}

export default StoryCard