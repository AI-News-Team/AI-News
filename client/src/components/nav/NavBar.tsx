import { Link, useResolvedPath } from "react-router-dom"
import SearchBox from "../search/SearchBox";
import HomeLogo from "../graphics/HomeLogo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

type Props = {
    topics: string[];
    customTopics: string[];
  };

const NavBar = ({ topics, customTopics }: Props) => {

    const [menuHidden, setMenuHidden] = useState(true);
    const hideMenu = () => {setMenuHidden(!menuHidden)}

    //not sure why, but this is necessary to have the active menu item change colour
    console.log(useResolvedPath("/topic1"))

    return (<>
        <div className="bg-black flex justify-center lg:px-5">
            <div className="w-[80em]">
                <nav className="w-[80em] text-white h-16">
                    <div className="flex h-full">
                        <div className="my-auto pr-4">
                            <HomeLogo size={4} />
                        </div>
                        <ul className="flex flex-column h-full">
                            {customTopics?.map((topic) =>  
                                <li key={topic}>
                                    <Link className={`h-full hover:bg-pink-800 flex items-center px-5 text-sm ${window.location.pathname == `/${topic}` ? "bg-slate-500" : "bg-black"}`} to={`/${topic}`}>{topic}</Link>
                                </li>)}
                            <li><button className="px-5 hover:bg-pink-800 h-full" onClick={hideMenu}><FontAwesomeIcon icon={faEllipsis} /></button></li>
                        </ul>
                        <div className="ml-auto h-full flex items-center">
                            <SearchBox searchPage={false} searchBoxContent={""}  />
                        </div>
                    </div>
                </nav>
                <div className={`flex flex-wrap w-[80em] bg-black text-white ${menuHidden ? "hidden" : "absolute"}`}>
                    {topics?.map((topic) =>  
                        <div key={topic}>
                            <Link onClick={hideMenu} className={`h-full hover:bg-pink-800 flex items-center p-5 text-sm ${window.location.pathname == `/${topic}` ? "bg-slate-500" : "bg-black"}`} to={`/${topic}`}>{topic}</Link>
                        </div>)}
                </div>
            </div>
        </div>
                </>)
}

const liStyle = "hover:bg-pink-800 flex items-center px-5"
export default NavBar;