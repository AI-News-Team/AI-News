import Image from '../../images/sample2.jpg'

var cardStyle = {
    backgroundImage: `url(${Image})`
}

const StoryCard = () => {

    return <div style={cardStyle} className="w-[31%] bg-red-500 mt-5 h-80 flex flex-col justify-end bg-cover">
    <div className="bg-white p-2 border">
        <h3>HEADLINE</h3>
        <div>A bit of a summary of the story presented in the image.</div>
    </div>
    </div>
}

export default StoryCard