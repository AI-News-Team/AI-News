import { Link, useResolvedPath } from "react-router-dom";
import SearchBox from "../tools/SearchBox";
import HomeLogo from "../graphics/HomeLogo";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";


type Props = {
  topics: string[];
};

const MobileNav = ({ topics }: Props) => {

    const [menuVisibility, setMenuVisibility] = useState(false);
    const show = true;

    const setMenuDisplay = () => {setMenuVisibility(!menuVisibility);};

  //not sure why, but this is necessary to have the active menu item change colour
  console.log(useResolvedPath("/topic1"));

  return (
    <nav className="w-full text-white h-16 bg-black fixed z-20">
      <div className="h-full flex justify-between">
        <div className="w-8 h-full"></div>
        <div className="my-auto">
          <HomeLogo size={4} />
        </div>
        <button onClick={setMenuDisplay} className="w-8 text-center">
          <FontAwesomeIcon icon={faCaretDown} size="xl" />
        </button>
      </div>
      <div className={menuVisibility ? menuShow : menuHidden}>
        {topics.map((topic) => (
          <div key={topic} className="flex justify-center">
            <Link
              onClick={setMenuDisplay}
              className={`bg-black w-screen p-2 text-sm text-center border-t border-slate-700 ${
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
        <div className="items-center w-11/12">
          <SearchBox />
        </div>
      </div>
    </nav>
  );
};

const menuHidden =
  "transition ease-in-out z-10 w-full absolute bottom-[100%] bg-black pb-5 flex flex-col items-center";
const menuShow =
  "transition ease-in-out z-10 w-full absolute top-16 bg-black pb-5 flex flex-col items-center";
const liStyle = "hover:bg-pink-800 flex items-center px-5";
export default MobileNav;
