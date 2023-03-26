import { Link } from "react-router-dom";

type Props = {
  topics: string[];
};

const FooterNav = ({ topics }: Props) => {
  return (
    <nav className="w-full text-white flex items-stretch">
      <ul className="w-full flex">
        {topics.map((topic) => (
          <li className="w-1/6 border-r h-12">
            <Link
              className={`h-full hover:bg-pink-800 flex items-center px-5`}
              to={`/${topic}`}
            >
              {topic}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default FooterNav;