import { toast } from "sonner";
import { Appbar } from "../components/AppBar";
import { FullBlog } from "../components/FullBlog";
import { Spinner } from "../components/Spinner";
import { useBlog } from "../hooks";
import { useNavigate, useParams } from "react-router-dom";

export const Blog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, blog, error } = useBlog({ id: id || "" });

  if (loading) {
    return (
      <div>
        <Appbar />

        <div className="h-screen flex flex-col justify-center">
          <div className="flex justify-center">
            <Spinner />
          </div>
        </div>
      </div>
    );
  }

  if (blog == undefined) {
    toast.error(`Blog with id not found`, { duration: 3000 });
    navigate("/blogs");
  }
  if (error) {
    toast.error(`${error}`);
  }

  return (
    <div>
      <FullBlog blog={blog} />
    </div>
  );
};
