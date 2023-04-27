import { Link, useResolvedPath } from "react-router-dom";
import SearchBox from "../tools/SearchBox";
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
    <nav className="w-full text-white h-12 bg-black fixed z-20">
      <div className="h-full flex justify-between border-b border-slate-700">
        <div className="w-8 h-full"></div>
        <div className="my-auto">
          <HomeLogo size={2} />
        </div>
        <button onClick={setMenuDisplay} className="w-8 text-center">
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </button>
      </div>
      <div
        className={
          menuVisibile
            ? "transition ease-in-out delay-150 z-10 w-full absolute bg-black pb-5 flex flex-col items-center"
            : "hidden"
        }
      >
        {topics.map((topic) => (
          <div key={topic} className="flex justify-center">
            <Link
              onClick={setMenuDisplay}
              className={`bg-black w-screen p-2 text-sm text-center border-b border-slate-700 ${
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
        <div className="items-center w-11/12 pt-5">
          <SearchBox />
        </div>
      </div>
    </nav>
  );
};

const liStyle = "hover:bg-pink-800 flex items-center px-5";
export default MobileNav;
