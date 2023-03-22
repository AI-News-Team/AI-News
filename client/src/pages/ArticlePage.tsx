import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getData } from "../utils/axios";
import axios from "axios";
import LeadingSidebar from "../components/page-components/LeadingSidebar";
import colors from "../styles/colors";
import React from "react";

const domain = import.meta.env.VITE_SERVER_DOMAIN

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

    const [color, setColor] = useState<string>()

    const params = useParams();
    const currentDomain=`${domain}article.get/${params.id}`

    const [data, setData] = useState<Story>();

    useEffect(()=>{
        getData(currentDomain, setData)
        },[])

    useEffect(()=>{
        colors.forEach(color => {
            if (color.topic == data?.category) {
                setColor(color.color)
            }})
    },[data])

return (
  <>
    <h2 className="pt-10 font-bold" style={{ color: color }}>
      {data?.category.toUpperCase()}
    </h2>
    <hr
      style={{ background: color }}
      className="h-px bg-gray-200 border-0 dark:bg-gray-700 mb-10"
    ></hr>
    <div className="flex">
      <div className="w-8/12 pr-6 border-gray-300 border-r">
        <h1 className="pb-8">{data?.name}</h1>
        <img className="object-cover h-96 w-full" src={data?.cover_url} />
        <h2 className="py-3">By {data?.author}</h2>
        <p className="py-3">{data?.body}</p>
      </div>
      <div className="w-4/12 pl-20">
        <LeadingSidebar color={color!} />
      </div>
    </div>
  </>
);
}

export default ArticlePage