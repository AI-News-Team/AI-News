import { Link, useResolvedPath } from "react-router-dom";
import SearchBox from "../search/SearchBox";
import HomeLogo from "../graphics/HomeLogo";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";


type Props = {
  topics: string[];
};

const MobileNav = ({ topics }: Props) => {

    const [menuVisibile, setMenuVisibile] = useState(false);
    const show = true;

    const setMenuDisplay = () => {setMenuVisibile(!menuVisibile);};

  //not sure why, but this is necessary to have the active menu item change colour
  console.log(useResolvedPath("/topic1"));

  return (
    <nav className="w-full text-white h-16 bg-black fixed z-20">
      <div className="h-full flex justify-between border-b border-slate-700">
        <div className="w-8 h-full"></div>
        <div className="my-auto">
          <HomeLogo size={3} />
        </div>
        <button onClick={setMenuDisplay} className="w-8 text-center">
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </button>
      </div>
      <div
        className={
          menuVisibile
            ? "transition ease-in-out delay-150 z-10 w-screen absolute bg-black flex flex-wrap items-center"
            : "hidden"
        }
      >
        <div className="items-center w-full p-3 sm:mx-auto">
          <SearchBox searchPage={false} searchBoxContent={""} setMenuVisibile={setMenuVisibile}/>
        </div>
        {topics?.map((topic) => (
          <div key={topic} className="flex w-1/2 sm:w-2/6">
            <Link
              onClick={setMenuDisplay}
              className={`p-2 text-sm w-full md:text-base text-center border-r border-slate-700 ${
                window.location.pathname == `/${topic}`
                  ? "bg-slate-500"
                  : "bg-black"
              }`}
              to={`/${topic}`}
            >
              {topic}
            </Link>
          </div>
        ))}
      </div>
    </nav>
  );
};

const liStyle = "hover:bg-pink-800 flex items-center px-5";
export default MobileNav;
