import React from "react";
import axios from "axios";

const NavBar = () => {

    
    const getData = async () => {
        console.log("here")
        try {
            const response = await axios.get("http://localhost:3002/article.list");
            return response
        }
        catch (error) {
            console.log(error);
        }
    }
    const getStuff = getData();

    console.log(getStuff)
    

    return (
        <div className="bg-black flex justify-center h-14 w-screen">
            <div className="bg-red-900 w-3/5">jhljkhh</div>
        </div>
    )
}

export default NavBar;