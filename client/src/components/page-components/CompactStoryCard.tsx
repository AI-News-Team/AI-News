import { Link } from "react-router-dom";

type Props = {
    id: number,
    title: string,
    image: string
  };

const CompactStoryCard = ({ image, title, id }: Props) => {

    return (
        <div className="w-full">
            <a href={`/article/${id}`} ><img src={image} alt="" className='object-cover h-42 w-full' /></a>
            <div className="bg-white pb-5 border-b-2 h-26 mb-5">
                <a href={`/article/${id}`} ><h3 className='font-bold leading-5'>{title}</h3></a>
            </div>
        </div>
    )
}

export default CompactStoryCard;