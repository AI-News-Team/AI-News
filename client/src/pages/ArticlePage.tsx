import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getData } from "../utils/axios";
import axios from "axios";

import colors from "../styles/colors";

const domain = import.meta.env.VITE_SERVER_DOMAIN

const [colour, setColour] = useState<string>()

type Story = {
    id: number,
    name: string,
    author: string,
    body: string,
    source_url: string,
    cover_url: string,
    category: string
}


const ArticlePage = () => {

    const params = useParams();
    const currentDomain=`${domain}article.get/${params.id}`

    const [data, setData] = useState<Story>();

    useEffect(()=>{
        getData(currentDomain, setData)
    },[])

    // console.log(colors)
    colors.forEach(color => {
        if (color.topic == data?.category) {
            setColour(color.topic)
        }
        
    });

return (<>
<h1>{data?.name}</h1>
<img src={data?.cover_url}/>
<h2>By {data?.author}</h2>
<p>{data?.body}</p>
</>)
}

export default ArticlePage