import { Link, useResolvedPath } from "react-router-dom";
import SearchBox from "../tools/SearchBox";
import FooterNav from "../nav/FooterNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";
import HomeLogo from "../graphics/HomeLogo";

type Props = {
  topics: string[];
};

const year = new Date().getFullYear();

const Footer = ({ topics }: Props) => {

  return (
    <div className="flex justify-center align-center bg-black mt-auto">
      <div className="w-[80em]">
        <div className="py-8">
          <SearchBox />
        </div>
          <FooterNav topics={topics}/>
        <div className="mt-5 flex">
          <HomeLogo size={3}/>
        <div className="text-white ml-auto flex items-center">
          <FontAwesomeIcon className="mr-5" icon={faFacebook} size={"xl"} />
          <FontAwesomeIcon className="mr-5" icon={faTwitter} size={"xl"} />
          <FontAwesomeIcon className="mr-5" icon={faInstagram} size={"xl"} />
          <FontAwesomeIcon icon={faTiktok} size={"xl"} />
          </div>
        </div>
        <hr className="h-px my-8 bg-gray-600 border-0 dark:bg-gray-700"></hr>
        <p className="text-slate-400 text-sm mb-5">
          © {year} Artificial Intelligence Daily News. Produced by AI-News-Team.
          All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

const liStyle = "hover:bg-pink-800 flex items-center px-5";

export default Footer;
