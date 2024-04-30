import { Blog } from "../hooks";
import { Appbar } from "./AppBar";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Appbar />
      <div className="">
        <div className="grid md:grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
        <div className="flex md:hidden ">
          <div className="text-slate-600 text-sm px-2 pt-1">Author</div>
          <Avatar size="small" name={blog.author.name || "Anonymous"} />
          <div className=" px-3 text-l font-bold">
            {blog.author.name || "Anonymous"}
          </div>
        </div>
          <div className="md:col-span-8 p-4">
            <div className="text-5xl font-extrabold">{blog.title}</div>
            <div className="text-slate-500 pt-2">Post on 2nd December 2023</div>
            <div className="pt-4">{blog.content}</div>
          </div>
          <div className="md:col-span-4 hidden md:block">
            <div className="text-slate-600 text-lg">Author</div>
            <div className="flex w-full">
              <div className="pr-4 flex flex-col justify-center">
                <Avatar size="big" name={blog.author.name || "Anonymous"} />
              </div>
              <div>
                <div className="text-xl font-bold">
                  {blog.author.name || "Anonymous"}
                </div>
                <div className="pt-2 text-slate-500">
                  Random catch phrase about the author's ability to grab the
                  user's attention
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
