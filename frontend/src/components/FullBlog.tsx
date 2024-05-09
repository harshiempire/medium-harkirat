import { Blog } from "../hooks";
import axios from "axios";
import { Appbar } from "./AppBar";
import { Avatar } from "./BlogCard";
import Blocks from "editorjs-blocks-react-renderer";
import Button from "./Button";
import { useState } from "react";
import { TextEditor } from "../pages/Publish";
import { BACKEND_URL } from "../config";
import { configForBlock } from "./BlocksConfig";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  // console.log(blog.content);
  const [title] = useState(blog.title);
  const [isEditing, setIsEditing] = useState(false);
  const [descriptionEdit, setDescriptionEdit] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <>
      {!isEditing ? (
        <div>
          <Appbar />
          <div className="">
            <div className="grid md:grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
              <div className="flex md:hidden ">
                <div className="w-24">
                  <Button
                    loading={false}
                    onClick={() => {
                      setIsEditing(true);
                    }}
                  >
                    Edit
                  </Button>
                </div>
                <div className="text-slate-600 text-sm px-2 pt-1">Author</div>
                <Avatar size="small" name={blog.author.name || "Anonymous"} />
                <div className=" px-3 text-l font-bold">
                  {blog.author.name || "Anonymous"}
                </div>
              </div>
              <div className="md:col-span-8 p-4">
                <div className="text-5xl font-extrabold">{blog.title}</div>
                <div className="text-slate-500 pt-2">
                  Post on 2nd December 2023
                </div>
                <div className="pt-4">
                  <Blocks
                    data={JSON.parse(blog.content)}
                    config={configForBlock}
                  />
                </div>
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
                <div className="w-24 m-3">
                  <Button
                    loading={false}
                    onClick={() => {
                      setIsEditing(true);
                    }}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Appbar />
          <div className="">
            <div className="grid md:grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
              <div className="flex md:hidden ">
                <div className="w-24">
                  <Button
                    loading={loading}
                    onClick={async () => {
                      setLoading(true);
                      await axios.put(
                        `${BACKEND_URL}/api/v1/blog`,
                        {
                          title,
                          content: descriptionEdit,
                          id: blog.id,
                        },
                        {
                          headers: {
                            Authorization: localStorage.getItem("token"),
                          },
                        }
                      );
                      // navigate(`/blog/${response.data.post.id}`);
                      window.location.reload();
                    }}
                  >
                    Update
                  </Button>
                </div>
                <div className="w-24 mx-2">
                  <Button
                    loading={loading}
                    onClick={async () => {
                      setIsEditing(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
                <div className="text-slate-600 text-sm px-2 pt-1">Author</div>
                <Avatar size="small" name={blog.author.name || "Anonymous"} />
                <div className=" px-3 text-l font-bold">
                  {blog.author.name || "Anonymous"}
                </div>
              </div>
              <div className="md:col-span-8 p-4">
                <div className="text-5xl font-extrabold">{blog.title}</div>
                <div className="text-slate-500 pt-2">
                  Post on 2nd December 2023
                </div>
                <div className="pt-4">
                  <TextEditor
                    data={blog.content}
                    onChange={(e) => {
                      console.log(e);
                      setDescriptionEdit(e);
                    }}
                  />

                  {/* <Blocks
                    data={JSON.parse(blog.content)}
                    config={{
                      code: {
                        className: "language-js",
                      },
                      delimiter: {
                        className: "border border-2 w-16 mx-auto",
                      },
                      embed: {
                        className: "border-0",
                      },
                      header: {
                        className: "font-bold",
                        actionsClassNames: {},
                      },
                      image: {
                        className: "w-full max-w-screen-md",
                        actionsClassNames: {
                          stretched: "w-full h-80 object-cover",
                          withBorder: "border border-2",
                          withBackground: "p-2",
                        },
                      },
                      list: {
                        className: "list-inside",
                      },
                      paragraph: {
                        className: "text-base text-opacity-75 py-2",
                        actionsClassNames: {
                          alignment: "text-{alignment}", // This is a substitution placeholder: left or center.
                        },
                      },
                      quote: {
                        className: "py-3 px-5 italic font-serif",
                      },
                      table: {
                        className: "table-auto",
                      },
                    }}
                  /> */}
                </div>
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
                <div className="w-24 m-3">
                  <Button
                    loading={false}
                    onClick={async () => {
                      // setIsEditing(false);
                      setLoading(true);
                      await axios.put(
                        `${BACKEND_URL}/api/v1/blog`,
                        {
                          title,
                          content: descriptionEdit,
                          id: blog.id,
                        },
                        {
                          headers: {
                            Authorization: localStorage.getItem("token"),
                          },
                        }
                      );
                      // navigate(`/blog/${response.data.post.id}`);
                      window.location.reload();
                    }}
                  >
                    Update
                  </Button>
                </div>
                <div className="w-24 mx-2">
                  <Button
                    loading={loading}
                    onClick={async () => {
                      setIsEditing(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
