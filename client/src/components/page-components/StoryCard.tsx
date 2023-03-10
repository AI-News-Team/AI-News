import Image from '../../images/sample2.jpg'

var cardStyle = {
    backgroundImage: `url(${Image})`
}

type Props = {
    image: string;
  };

const StoryCard = ({ image }: Props) => {

    return <div className="w-[31%] mt-5 h-80">
        <img src={Image} alt="" className='object-cover h-4/5 w-full' />
    <div className="bg-white p-2 border">
        <h3>HEADLINE</h3>
        <div>A bit of a summary of the story presented in the image.</div>
    </div>
    </div>
}

export default StoryCard