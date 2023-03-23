import HeadlineCard from "./HeadlineCard"
import { Article } from "@shared";

type Props = {
    stories: Article[]
}

const Headlines = ( props: Props ) => {

    const firstFourStories = props.stories?.slice(0, 4)

    return (<>
        {console.log(props.stories)}
        <div className="w-full flex justify-between px-10">
            {firstFourStories?.map(story => <HeadlineCard key={story.id} id={story.id} img={story.cover_url} headline={story.name}/>)}
        </div>
        </>
    )
}

export default Headlines