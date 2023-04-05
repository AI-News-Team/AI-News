import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";
import SortDropDownMenu from "./SortDropDownMenu"

type Params = {
  order: string,
  sort: string
}

const sortOptions: string[] = ["name", "author", "publication_date"];
const byOptions: string[]  = ["ascending","descending"]

const SortDropDown = () => {
    const [searchParams, setSearchParams] = useSearchParams({});
    const [params, setParams] = useState<Params>({ sort: "", order: "desc" });

    const setSortBy = (value:string) => {
      setParams({...params, sort: value})
    }

    const setOrder = (value: string) => {
      setParams({ ...params, order: value === "ascending" ? "asc" : "desc" });
    };

    useEffect(() => {
      if (params.sort)
      setSearchParams(params);
    },[params])

    return (
      <div>
        <SortDropDownMenu options={sortOptions} setParams={setSortBy} title={"Sort By: "}/>
        <SortDropDownMenu options={byOptions} setParams={setOrder} title={""}/>
      </div>
    );
}

export default SortDropDown;