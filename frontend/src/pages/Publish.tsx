import { Appbar } from "../components/AppBar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import EditorJSComp from "../components/EditorJSComp";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(
    JSON.stringify({
      time: 1715148112218,
      blocks: [
        {
          id: "-tQr_CUe_H",
          type: "paragraph",
          data: { text: "" },
        },
      ],
      version: "2.29.1",
    })
  );
  const navigate = useNavigate();

  return (
    <div>
      <Appbar />
      <div className="flex justify-center w-full pt-8">
        <div className="max-w-screen-lg w-full ">
          <input
            type="text"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 text-5xl font-extrabold mb-5"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextEditor
            data={description}
            onChange={(e) => {
              console.log(e);
              setDescription(e);
            }}
          />

          <button
            onClick={async () => {
              if (description.includes("[]")) {
                console.log("Content cannot be empty");
                return;
              } else {
                const response = await axios.post(
                  `${BACKEND_URL}/api/v1/blog`,
                  {
                    title,
                    content: description,
                  },
                  {
                    headers: {
                      Authorization: localStorage.getItem("token"),
                    },
                  }
                );
                navigate(`/blog/${response.data.id}`);
              }
            }}
            type="submit"
            className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          >
            Publish post
          </button>
        </div>
      </div>
    </div>
  );
};

export function TextEditor({
  data,
  onChange,
}: {
  data: string;
  onChange: (e: string) => void;
}) {
  console.log(data);
  return (
    // <div className="mt-2">
    //   <div className="w-full mb-4 ">
    //     <div className="flex items-center justify-between border">
    //       <div className="my-2 bg-white rounded-b-lg w-full">
    //         <label className="sr-only">Publish post</label>
    //         <textarea
    //           onChange={onChange}
    //           id="editor"
    //           rows={8}
    //           className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2"
    //           placeholder="Write an article..."
    //           required
    //         />
    //       </div>
    //     </div>
    //   </div>
    <EditorJSComp data={data} onChange={onChange} />
    // </div>
  );
}
