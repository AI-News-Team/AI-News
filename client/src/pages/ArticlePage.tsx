import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getData, postData } from "../utils/axios";
import LeadingSidebar from "../components/page-components/LeadingSidebar";
import { Article } from "@shared";
import { noImage } from "../images/commonImages";

type Category = {
  category: string,
  description: string,
  color: string
};

const ArticlePage = () => {

    const [color, setColor] = useState<string>()
    const [categories, setCategories] = useState<Category[]>([])

    const params = useParams<string>();
    const currentDomain=`/article.get/${params.id}`
    const postDomain = "/article.record_visit";

    const [data, setData] = useState<Article>();

    const visitedPages = localStorage.getItem("visited")
    
    useEffect(()=>{
      //changing local storage string into array
      const slicedString = visitedPages?.slice(2, -2);
      const newVisitedArray = slicedString?.split('","')

      //if current id is NOT in local storage array, add id, record in database as a visit
      if (!newVisitedArray?.includes(`${params.id}`)) {
        newVisitedArray?.push(`${params.id}`)
        localStorage.setItem("visited", JSON.stringify(newVisitedArray))
        postData(postDomain, { id: params.id });
      }

      getData(currentDomain, setData)
      getData("/category.list", setCategories);
      window.scrollTo(0, 0);
    },[params.id])

    useEffect(()=>{
      categories.forEach(category => {
            if (category.category == data?.category) {
                setColor(category.color)
            }})
    },[data])

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
          data?.body.map((text, i) => <p className={`py-2 lg:text-md ${i==0 ? 'font-bold' : 'font-normal'}`}>{text}</p>)
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