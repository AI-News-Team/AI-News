import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getData } from "../utils/axios";
import axios from "axios";

const domain = import.meta.env.VITE_SERVER_DOMAIN


const ArticlePage = () => {

    const params = useParams();
    const currentDomain=`${domain}article/${params.id}`
    console.log(currentDomain)

    const [data, setData] = useState();

    useEffect(()=>{
        // getData(currentDomain, setData)
    },[])


    console.log(params)
return (<>

<div> Its an article, it's id is {params.id} </div>
</>)
}

export default ArticlePage