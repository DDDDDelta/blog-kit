import { useState, useEffect } from "react";
import { getAllPosts, Post } from "./posts";

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate async fetch for demo
    const id = setTimeout(() => {
      setPosts(getAllPosts());
      setLoading(false);
    }, 300);
    return () => clearTimeout(id);
  }, []);

  return { posts, isLoading };
}
