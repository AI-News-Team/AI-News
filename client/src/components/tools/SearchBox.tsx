const SearchBox =() => {

    return (
      <>
        <form className="bg-white flex p-2 ">
          <input
            className="w-full"
            type="text"
            placeholder="Search AI Daily...."
            name="search"
          />
          <button className="ml-auto px-1" type="submit">
            <i className="fa-solid fa-magnifying-glass text-black" />
          </button>
        </form>
      </>
    );
}

export default SearchBox