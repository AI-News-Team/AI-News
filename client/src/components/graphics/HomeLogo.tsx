import { Link } from "react-router-dom"

type Props = {
    size: number;
  };

const Logo = ({ size }: Props) => {
    return(
    <Link to="/" className={`text-white text-${size}xl font-black`}>
    D<span className="text-pink-700">AI</span>LY
  </Link>)
}

export default Logo