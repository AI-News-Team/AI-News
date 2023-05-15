import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getData } from "../utils/axios";
import SearchBox from "../components/search/SearchBox";
import SearchResult from "../components/search/SearchResult";

const domain = import.meta.env.VITE_SERVER_DOMAIN

type Story = {
    id: number,
    name: string
}

const Search = () => {

    const url = window.location.pathname;
    const params = useParams();
    const currentDomain=`${domain}article.search?query=${params.search}`
    const [data, setData] = useState<Story[]>();
    
    useEffect(()=>{
        getData(currentDomain, setData)
        window.scrollTo(0, 0);
    },[url])

    return (
      <>
        <SearchBox searchPage={true} searchBoxContent={params.search!} />
        <p className="text-2xl pt-10">Showing Search Results for: <span className="font-bold">{params.search}</span></p>
        {data && (
          <div className="my-14 md:mt-10">
            {data?.map((story) => (
              <SearchResult storyName={story.name} id={story.id} />
            ))}
          </div>
        )}
      </>
    );
}

export default Search