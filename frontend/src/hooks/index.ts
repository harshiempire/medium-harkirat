import axios from "axios";
import { BACKEND_URL } from "../config";
import { useQuery } from "react-query";

export interface Blog {
  content: string;
  title: string;
  id: number;
  author: {
    name: string;
  };
}

export const useBlog = ({ id }: { id: string }) => {
  const { data, error, isLoading } = useQuery(
    ["blog", id], // cache key
    async () => {
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      return response.data.blog;
    },
    {
      cacheTime: 1000 * 60 * 30, // cache for 30 minutes
    }
  );

  return {
    loading: isLoading,
    blog: data,
    error,
  };
};

const fetchBlogs = async () => {
  const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  return response.data.blogs;
};

export const useBlogs = () => {
  const { data, error, isLoading } = useQuery(
    "blogs", // key
    fetchBlogs, // function to fetch data
    {
      // options
      staleTime: 1000 * 60 * 5, // cache for 5 minutes
    }
  );

  return {
    loading: isLoading,
    blogs: data,
    error,
  };
};
