"use client";

import { useEffect, useState } from "react";
import { PostValidated } from "@/types/post";
import { postService } from "@/services/postService";;
import PostCard from "./PostCard";
import { Button } from "../ui/button";

export default function PostList() {
  const [posts, setPosts] = useState<PostValidated[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    postService
      .getPosts()
      .then((data) => setPosts(data))
      .catch((err) => {
        console.error("Erreur lors de la récupération des posts :", err);
        setError("Impossible de charger les articles.");
      });
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {posts.map((post) => (
        <div key={post.id} className="space-y-4">
          <PostCard post={post} />
          <Button className="w-full">Lire plus</Button>
        </div>
      ))}
    </div>
  );
}
