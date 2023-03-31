import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

type Props = {
    setParams: Function,
    options: string[],
    title: string
  };

const SortDropDownMenu = ({ setParams, options, title }: Props) => {

  return(<>
    {title}
    <select
      className="ml-5 mt-2 border"
      onChange={(event) => setParams(event.target.value)}
    >
        <option className="bg-red-500" value="" selected disabled hidden>
          Select
        </option>
        {options.map((option) => (
          <option key={option} value={`${option}`}>{option}</option>
        ))}
    </select>
    </>
  )
}

export default SortDropDownMenu;