import React from "react"

type Props = {
    topic: string;
    color: string
  };



const TopicPage = ({ topic, color }: Props) => {
    return (
        <div className="bg-red-500">
            <h1 style={{color: color}} className={`text-xl`}>{topic.toUpperCase()}</h1>
            <hr style={{background: color}} className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
        </div>
    )
}

export default TopicPage