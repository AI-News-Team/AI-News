import { Link, useResolvedPath } from "react-router-dom"
import SearchBox from "../tools/SearchBox";
import HomeLogo from "../graphics/HomeLogo";

type Props = {
    topics: string[];
  };

const NavBar = ({ topics }: Props) => {

    //not sure why, but this is necessary to have the active menu item change colour
    console.log(useResolvedPath("/topic1"))

    return (
        <div className="bg-black flex justify-center">
            <nav className="w-[80em] text-white flex h-16">
                <div className="my-auto pr-4">
                    <HomeLogo size={4} />
                </div>
                <ul className="flex flex-column h-full">
                    {topics.map((topic) =>  
                        <li key={topic}>
                            <Link className={`h-full hover:bg-pink-800 flex items-center px-5 text-sm ${window.location.pathname == `/${topic}` ? "bg-slate-500" : "bg-black"}`} to={`/${topic}`}>{topic}</Link>
                        </li>)}
                </ul>
                <div className="ml-auto h-full flex items-center">
                <SearchBox />
                </div>
            </nav>
        </div>
    )
}

const liStyle = "hover:bg-pink-800 flex items-center px-5"
export default NavBar;