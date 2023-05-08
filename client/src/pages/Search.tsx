
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getData } from "../utils/axios";
import { Link } from "react-router-dom";
import SearchResult from "../components/search/SearchResult";


const domain = import.meta.env.VITE_SERVER_DOMAIN

type Story = {
    id: number,
    name: string
}

console.log(domain)
const Search = () => {

    const url = window.location.pathname;

    const params = useParams();
    console.log(params.search)
    const currentDomain=`${domain}article.search?query=${params.search}`
    
    const [data, setData] = useState<Story[]>();
    console.log(data)
    
    useEffect(()=>{
        getData(currentDomain, setData)
        window.scrollTo(0, 0);
    },[url])

    return(
        <div className="mt-14 md:mt-10">
            {data?.map((story) => (
                <SearchResult storyName={story.name} id={story.id}/>
            ))}
        </div>
    )
}

export default Search