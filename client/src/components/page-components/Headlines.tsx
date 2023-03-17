import HeadlineCard from "./HeadlineCard"

type Props = {
    stories: Story[]
}

type Story = {
    id: number,
    name: string,
    author: string,
    body: string,
    source_url: string,
    cover_url: string,
    category: string
}

const Headlines = ( props: Props ) => {
    return (<>
        {console.log(props.stories)}
        <div className="w-full flex justify-between px-10">
            {props.stories?.map(story => <HeadlineCard key={story.id} id={story.id} img={story.cover_url} headline={story.name}/>)}
        </div>
        </>
    )
}

export default Headlines