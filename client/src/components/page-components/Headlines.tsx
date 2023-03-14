import HeadlineCard from "./HeadlineCard"

type Props = {
    stories: Story[]
}

type Story = {
    name: string,
    author: string,
    body: string,
    source_url: string,
    cover_url: string,
    category: string
}

const Headlines = ( props: Props ) => {
    return (
        <div className="w-full flex justify-between px-10">
            {props.stories?.map(story => <HeadlineCard img={story.cover_url} headline={story.name}/>)}
        </div>
    )
}

export default Headlines