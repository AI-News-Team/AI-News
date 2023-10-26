import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getData } from "../utils/axios";
import LeadingSidebar from "../components/page-components/LeadingSidebar";
import { Article } from "@shared";
import { noImage } from "../images/commonImages";
import RelatedStories from "../components/page-components/RelatedStories";

type Category = {
  category: string,
  description: string,
  color: string
};

type Story = {
  id: number,
  name: string,
  cover_url: string,
  image_gen: boolean,
  score: string
}

const ArticlePage = () => {

    const [color, setColor] = useState<string>()
    const [categories, setCategories] = useState<Category[]>([])

    const params = useParams();
    const currentDomain=`/article.get/${params.id}`

    const [data, setData] = useState<Article>();

    const searchDomain=`article.search?query=${data?.name}`
    const [related, setRelated] = useState<Story[]>();

    // const relatedSample: Article[] = [];
    const [relatedSample, setRelatedSample] = useState<Story[]>();
    
    useEffect(()=>{
        getData(currentDomain, setData)
        getData("/category.list", setCategories);
        window.scrollTo(0, 0);
        },[])

    useEffect(()=>{
      categories.forEach(category => {
            if (category.category == data?.category) {
                setColor(category.color)
            }})
            const temp: Story[] = [];

            // Just for testing purposes, will remove
            // temp.push({id: data?.id, name: data?.name, cover_url: data?.cover_url, image_gen: data?.image_gen,})
            // temp.push({id: data?.id, name: data?.name, cover_url: data?.cover_url, image_gen: data?.image_gen,})
            // temp.push({id: data?.id, name: data?.name, cover_url: data?.cover_url, image_gen: data?.image_gen,})
            // temp.push({id: data?.id, name: data?.name, cover_url: data?.cover_url, image_gen: data?.image_gen,})
            // temp.push({id: data?.id, name: data?.name, cover_url: data?.cover_url, image_gen: data?.image_gen,})
            // setRelatedSample(temp.slice(0, 3))
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
        {data?.image_gen ? 
          <img className="object-cover h-[35em] w-full" src={`/article_images/${params.id}.png`} /> : 
          (data?.cover_url ? (
            <img className="object-cover h-96 w-full" src={data?.cover_url} />
          ) : (
            <img className="object-cover h-96 w-full" src={noImage} />
          ))
          }
        <h3 className="py-6 text-gray-400">By {data?.author} | AI News</h3>
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
    {related ? 
      <RelatedStories
        key={`related-${data?.id}`}
        topic="Related Articles"
        color={color}
        stories={related?.slice(0, 3)}
      /> 
      : <div></div>
    }
  </div>
);
}

export default ArticlePage