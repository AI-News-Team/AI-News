import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";
import ParamDropDownItem from "./ParamDropDownItem";

// import ParamDropDownItem from "./ParamDropDownItem"

type Params = {
  order: string,
  sort: string
}

const sortOptions = ["name", "author", "publication_date"];
const byOptions = ["asc","desc"]

const ParamDropDown = () => {
    const [searchParams, setSearchParams] = useSearchParams({});
    const [params, setParams] = useState<Params>({ sort: "", order: "desc" });

    const setSortBy = (value:string) => {
        setParams({...params, sort: value})
    }

    const setOrder = (value: string) => {
      setParams({ ...params, order: value });
    };

    useEffect(() => {
      if (params.sort)
      setSearchParams(params);
    },[params])

    return (
      <>
        {/* <ParamDropDown options={sortOptions} /> */}
        Sort By:
        <select
          className="mr-5"
          onChange={(event) => setSortBy(event.target.value)}
        >
          <>
            <option value="" selected disabled hidden>
              Select
            </option>
            {sortOptions.map((option) => (
              <option value={`${option}`}>{option}</option>
            ))}
          </>
        </select>
        <select onChange={(event) => setOrder(event.target.value)}>
          <>
            <option value="" selected disabled hidden>
              Order
            </option>
            {byOptions.map((option) => (
              <option id="order" value={`${option}`}>
                {option}
              </option>
            ))}
          </>
        </select>
      </>
    );
}

export default ParamDropDown;