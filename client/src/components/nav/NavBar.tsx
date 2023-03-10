import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useResolvedPath } from "react-router-dom"

type Props = {
    topics: string[];
  };

const NavBar = ({ topics }: Props) => {

    const [location, setLocation] = useState<string>(window.location.pathname);
    const [data, setData] = useState<any>();
    
    const getData = async () => {
        try {
            const response = await axios.get("http://localhost:3002/article.list");
            setData(response)
            return response
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        // getData()
    },[])

    console.log(useResolvedPath("/topic1"))

    return (
        <div className="bg-black flex justify-center">
        <nav className="w-[80em] text-white flex justify-between items-stretch">
            <Link to="/" className="text-xl py-3">Site Name</Link>
            <ul className="flex flex-column">
                {topics.map((topic) => <li className={`${liStyle} ${window.location.pathname == `/${topic}` ? "bg-slate-500" : "bg-black"}`}>
                    <Link to={`/${topic}`}>{topic}</Link>
                </li>)}
            </ul>
        </nav>
        </div>
    )
}

const liStyle = "hover:bg-pink-800 flex items-center px-5"

export default NavBar;