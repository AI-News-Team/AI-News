import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

const NavBar = () => {

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
        getData()
    },[])

    

    return (
        <div className="bg-black flex justify-center h-14 w-screen">
            <div className="bg-red-900 w-3/5">jhljkhh</div>
        </div>
    )
}

export default NavBar;