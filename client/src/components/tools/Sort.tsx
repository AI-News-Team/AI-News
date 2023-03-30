import { useState } from "react"

const Sort = () => {

    const [showSort, setShowSort] = useState<boolean>(true)

    const setQuery = (value:string) => {
        console.log(value)
    }

    return  (
    <div className="w-100 h-20 flex">
        <div className="ml-auto z-10">
            <select onChange={(event) => setQuery(event.target.value)}>
                <option value="test1">Please choose an option</option>
                <option value="test2">Please choose an option</option>
                <option value="test3">Please choose an option</option>
                <option value="test4">Please choose an option</option>

            </select>
            {/* <button onClick={ () => setShowSort(!showSort) }className="bg-black text-white px-10 mt-3">Sort</button>
            <ul className={showSort?"hidden":""}>
                <li className="text-center border bg-white">Test</li>
                <li className="text-center border bg-white">Test</li>
                <li className="text-center border bg-white">Test</li>
                <li className="text-center border bg-white">Test</li>
            </ul> */}
        </div>
    </div>
);
}

export default Sort