import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


type Props = {
  searchPage: boolean,
  searchBoxContent: string,
  setMenuVisibile: Function
}

const SearchBox = ({ searchPage, searchBoxContent, setMenuVisibile }: Props) => {
  const [searchQuery, setSearchQuery] = useState<string>();
  const navigate = useNavigate();

  // sets contents of search bo
  useEffect(() => {
    if (searchBoxContent?.length !== 0) {
      setSearchQuery(searchBoxContent);
    }
  }, [searchBoxContent]);


  const handleSubmitForm = () => {
    if (!searchPage) {
      setSearchQuery("");
    }
    if (setMenuVisibile) {
      setMenuVisibile(false)
    }
    navigate(`/search/${searchQuery}`);
  };

  return (
    <>
      <form className="bg-white flex p-1 text-black border">
        <input
          className="w-full"
          type="text"
          placeholder="Search AI Daily...."
          name="search"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
        <Link to={`/search/${searchQuery}`} style={{pointerEvents: 'none'}}>
          <button
            className="ml-auto px-1"
            type="submit"
            onClick={handleSubmitForm}
            disabled={!searchQuery ? true : false}
          >
            <i className="fa-solid fa-magnifying-glass" />
          </button>
        </Link>
      </form>
    </>
  );
};

export default SearchBox