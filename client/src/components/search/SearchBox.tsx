import { Link } from "react-router-dom";
import { useState } from "react";

const SearchBox =() => {

  const [searchQuery, setSearchQuery] = useState<string>()

    return (
      <>
        <form className="bg-white flex p-2 text-black" >
          <input
            className="w-full"
            type="text"
            placeholder="Search AI Daily...."
            name="search"
            onChange={e => setSearchQuery(e.target.value)}
          />
          <Link to={`/search/${searchQuery}`}>
            <button className="ml-auto px-1" type="submit">
              <i className="fa-solid fa-magnifying-glass" />
            </button>
          </Link>
        </form>
      </>
    );
}

export default SearchBox