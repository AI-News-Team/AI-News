import HeadlineCard from "./HeadlineCard"
import { Article } from "ai-daily";

type Props = {
    stories: Article[]
}

const Headlines = ( props: Props ) => {

    const firstFourStories = props.stories?.slice(0, 4)

    return (<>
        <div className="w-full md:flex justify-between md:px-10 pb-12">
            {firstFourStories?.map(story => <HeadlineCard key={story.id} id={story.id} img={story?.image_gen ? `/article_images/${story.id}.png` : story.cover_url} headline={story.name}/>)}
        </div>
        </>
    )
}

export default Headlines