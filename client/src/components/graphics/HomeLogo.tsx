import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

type Props = {
    size: number;
  };

  const Logo = ({ size }: Props): JSX.Element => {
    
    if (size === 4) {
      return(
        <Link to="/" className={`text-white text-4xl font-black`}>
        D<span className="text-pink-700">AI</span>LY
        </Link>)
    }
    else if (size === 3) {
      return(
        <Link to="/" className={`text-white text-3xl font-black`}>
        D<span className="text-pink-700">AI</span>LY
        </Link>)
    }
    else 
      return(
        <Link to="/" className={`text-white text-5xl font-black`}>
        D<span className="text-pink-700">AI</span>LY
        </Link>)
  }

export default Logo