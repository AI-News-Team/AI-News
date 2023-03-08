import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useResolvedPath } from "react-router-dom"


const NavBar = () => {

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
    // const getStuff = getData();

    useEffect(() => {
        // getData()
        // setLocation(window.location.pathname)
        // console.log(location)
    },)
    console.log(useResolvedPath("/topic1"))

    

    return (
        <div className="bg-black w-screen flex justify-center">
        <nav className="w-[800px] text-white flex justify-between px-4 items-stretch">
            <Link to="/" className="text-xl py-3">Site Name</Link>
            <ul className="flex flex-column">
                <li className={`${liStyle} ${window.location.pathname == "/topic1" ? "bg-slate-500" : "text-brand-darkblue"}`}>
                    <Link to="/topic1">Topic 1</Link>
                </li>
                <li className={`${liStyle} ${window.location.pathname == "/topic2" ? "bg-slate-500" : "text-brand-darkblue"}`}>
                    <Link to="/topic2">Topic 2</Link>
                </li>
            </ul>
        </nav>
        </div>
    )
}

const liStyle = "hover:bg-pink-800 flex items-center px-5"

export default NavBar;