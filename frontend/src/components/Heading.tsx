import { Link } from "react-router-dom";

interface HeadingProps {
  mainText: string;
  subText: string;
  link: string;
  linkText: string;
}

function Heading({ mainText, subText, link, linkText }: HeadingProps) {
  return (
    <div className="mb-4 px-16">
      <div className="font-extrabold text-center text-3xl mb-2 mt-2">{mainText}</div>
      <div className="text-center my-1">
        {subText}{" "}
        <span className="font-light underline text-slate-500 ">
          <Link to={`/${link}`}>{linkText}</Link>
        </span>
      </div>
    </div>
  );
}

export default Heading;
