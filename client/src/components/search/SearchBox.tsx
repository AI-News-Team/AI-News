import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


type Props = {
  searchPage: boolean,
  searchBoxContent: string
}

const SearchBox = ({ searchPage, searchBoxContent }: Props) => {
  const [searchQuery, setSearchQuery] = useState<string>();
  const navigate = useNavigate();

      useEffect(() => {
        if (searchBoxContent?.length !== 0) {
          setSearchQuery(searchBoxContent);
        }
      }, []);


  const handleSubmitForm = () => {
    if (!searchPage) {
      setSearchQuery("");
    }
    navigate(`/search/${searchQuery}`);
  };

  return (
    <>
      <form className="bg-white flex p-2 text-black">
        <input
          className="w-full"
          type="text"
          placeholder="Search AI Daily...."
          name="search"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
        <Link to={`/search/${searchQuery}`}>
          <button
            className="ml-auto px-1"
            type="submit"
            onClick={handleSubmitForm}
          >
            <i className="fa-solid fa-magnifying-glass" />
          </button>
        </Link>
      </form>
    </>
  );
};

export default SearchBox