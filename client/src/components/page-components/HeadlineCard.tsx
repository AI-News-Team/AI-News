import Image from '../../images/sample2.jpg'

const img:string = "https://www.befunky.com/images/prismic/b60244c7-087b-409a-961b-831999aa5085_llama.jpg?auto=avif,webp&format=jpg&width=1920&height=1920&fit=bounds";

var cardStyle = {
    backgroundImage: `url(${Image})`
}

type Props = {
    headline: string;
  };

const HeadlineCard = ({ headline }: Props) => {
 return (
    <>
 <div className='h-[400px] w-1/5 rounded-lg shadow-[#5e5e5e] shadow-lg relative overflow-hidden'>
   <img src={img} alt="image" className="object-cover h-[400px] rounded-lg hover:scale-110 ease-in-out duration-300" />
    <h2 className="bg-black bg-opacity-50 rounded-b-lg text-white p-3 text-center absolute w-full bottom-0">{headline}</h2>
 </div>
 </>
 )
}

export default HeadlineCard