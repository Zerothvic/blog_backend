import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import TrendingPosts from "./TrendingPosts";
import API from "../services/api";
import PostEditor from "./PostEditor";

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get("/posts")
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleNewPost = (post) => {
    setPosts([post, ...posts]);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <PostEditor onPostCreated={handleNewPost}/>
      <TrendingPosts />
      <h2 className="text-2xl font-bold">Recent Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
