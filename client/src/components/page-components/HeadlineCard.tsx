import { Link } from "react-router-dom";

type Props = {
    id: number
    headline: string;
    img?: string;
  };

const HeadlineCard = ({ id, headline, img }: Props) => {
 return (
      <Link to={`/article/${id}`} className='h-[400px] w-1/5 rounded-lg shadow-[#5e5e5e] shadow-lg relative overflow-hidden'>
        <img src={img} alt="image" className="object-cover h-[400px] rounded-lg hover:scale-110 ease-in-out duration-300" />
        <h2 className="bg-black bg-opacity-50 rounded-b-lg text-white p-3 text-center absolute w-full bottom-0">{headline}</h2>
      </Link>

  )
}

export default HeadlineCard