import { Link } from "react-router-dom"

type Props = {
    id: number;
    storyName: string;
}

const SearchResult = ({id, storyName}: Props) => {
    return(
            <div className="font-bold px-10 py-5 text-lg hover:text-red-500 border-b">
                <Link to={`/article/${id}`}>
                    {storyName}
                </Link>
            </div>
    )
}

export default SearchResult