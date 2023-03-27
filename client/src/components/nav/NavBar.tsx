import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useResolvedPath } from "react-router-dom"
import SearchBox from "../tools/SearchBox";

type Props = {
    topics: string[];
  };

const NavBar = ({ topics }: Props) => {

    //not sure why, but this is necessary to have the active menu item change colour
    console.log(useResolvedPath("/topic1"))

    return (
        <>
        <div className="bg-black flex justify-center">
            <nav className="w-[80em] text-white flex h-16">
                <div className="my-auto">
                    <Link to="/" className="leading-none text-4xl font-black mr-8 pt-0">D<span className="text-pink-700">AI</span>LY</Link>
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
        </>
    )
}

const liStyle = "hover:bg-pink-800 flex items-center px-5"

export default NavBar;