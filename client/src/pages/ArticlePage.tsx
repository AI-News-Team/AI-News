import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getData } from "../utils/axios";
import LeadingSidebar from "../components/page-components/LeadingSidebar";
import colors from "../styles/colors";
import { Article } from "@shared";
import { noImage } from "../images/commonImages";

const ArticlePage = () => {

    const [color, setColor] = useState<string>()

    const params = useParams();
    const currentDomain=`/article.get/${params.id}`

    const [data, setData] = useState<Article>();
    
    useEffect(()=>{
        getData(currentDomain, setData)
        window.scrollTo(0, 0);
        },[])

    useEffect(()=>{
        colors.forEach(color => {
            if (color.topic == data?.category) {
                setColor(color.color)
            }})
    },[data])

    console.log(data)

return (
  <div className="px-3 xl:p-0">
    <h2 className="pt-10 font-bold" style={{ color: color }}>
      <Link to={`/${data?.category}`}>{data?.category.toUpperCase()}</Link>
    </h2>
    <hr
      style={{ background: color }}
      className="h-px bg-gray-200 border-0 dark:bg-gray-700 mb-10"
    ></hr>
    <div className="flex">
      <div className="md:w-8/12 md:pr-6 border-gray-300 md:border-r">
        <h1 className="pb-8">{data?.name}</h1>

        {data?.cover_url ? (
          <img className="object-cover h-96 w-full" src={data?.cover_url} />
        ) : (
          <img className="object-cover h-96 w-full" src={noImage} />
        )}
        <h3 className="py-6">{data?.author}</h3>
        {Array.isArray(data?.body) ? (
          data?.body.map((text) => <p className="py-2 lg:text-md">{text}</p>)
        ) : (
          <p className="py-2 lg:text-md">{data?.body}</p>
        )}
      </div>
      <div className="w-4/12 md:pl-5 xl:pl-20 hidden md:block">
        <LeadingSidebar color={color!} topic={data?.category!} />
      </div>
    </div>
  </div>
);
}

export default ArticlePage