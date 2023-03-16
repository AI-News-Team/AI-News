import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useResolvedPath } from "react-router-dom"

type Props = {
    topics: string[];
  };

const NavBar = ({ topics }: Props) => {

    //not sure why, but this is necessary to have the active menu item change colour
    console.log(useResolvedPath("/topic1"))

    return (
        <div className="bg-black flex justify-center align-center">
            <nav className="w-[80em] text-white flex items-stretch">
                <div className="flex justify-center align-center">
                    <Link to="/" className="text-4xl font-black py-3 mr-8">D<span className="text-pink-700">AI</span>LY</Link>
                    <ul className="flex flex-column">
                        {topics.map((topic) =>  
                            <li key={topic}>
                                <Link className={`h-full hover:bg-pink-800 flex items-center px-5 ${window.location.pathname == `/${topic}` ? "bg-slate-500" : "bg-black"}`} to={`/${topic}`}>{topic}</Link>
                            </li>)}
                    </ul>
                </div>
                <div className="pt-2 ml-auto text-gray-600">
                    <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                    type="search" name="search" placeholder="Search" />
                </div>
            </nav>
        </div>
    )
}

const liStyle = "hover:bg-pink-800 flex items-center px-5"

export default NavBar;