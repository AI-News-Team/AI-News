import { Link, useResolvedPath } from "react-router-dom"
import SearchBox from "../search/SearchBox";
import HomeLogo from "../graphics/HomeLogo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

type Props = {
    topics: string[];
  };

const NavBar = ({ topics }: Props) => {

    const [menuHidden, setMenuHidden] = useState(true);
    const hideMenu = () => {setMenuHidden(!menuHidden)};
    const date: string= new Date().toLocaleString("en-NZ",{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

    //not sure why, but this is necessary to have the active menu item change colour
    console.log(useResolvedPath("/topic1"))

    return (<>
        <div className="bg-black flex justify-center lg:px-5">
            <div className="w-[80em]">
                <nav className="w-full text-white">
                    <div className="flex h-20 justify-between">
                        <div className="w-52 my-auto text-sm">{date}</div>
                        <div className="my-auto pr-4">
                            <HomeLogo size={5} />
                        </div>
                        <div className="h-full flex items-center w-52">
                            <SearchBox searchPage={false} searchBoxContent={""}  />
                        </div>
                    </div>
                    <div className="h-10">
                        <ul className="flex h-full justify-between">
                            {topics?.map((topic) =>  
                                <li key={topic}>
                                    <Link className={`h-full hover:bg-pink-800 flex items-center px-4 text-sm ${window.location.pathname == `/${topic}` ? "bg-slate-500" : "bg-black"}`} to={`/${topic}`}>{topic}</Link>
                                </li>)}
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    </>)
}

const liStyle = "hover:bg-pink-800 flex items-center px-5"
export default NavBar;