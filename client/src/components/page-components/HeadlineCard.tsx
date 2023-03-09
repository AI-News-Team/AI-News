import Image from '../../images/sample2.jpg'

var cardStyle = {
    backgroundImage: `url(${Image})`
}

type Props = {
    headline: string;
  };

const HeadlineCard = ({ headline }: Props) => {
 return (
    <>
 <div style = {cardStyle} className='h-[400px] w-1/5 rounded-lg flex flex-col justify-end bg-cover shadow-[#5e5e5e] shadow-lg'>
    <h2 className="bg-black bg-opacity-50 rounded-b-lg text-white p-3 text-center">{headline}</h2>
 </div>
 </>
 )
}

export default HeadlineCard