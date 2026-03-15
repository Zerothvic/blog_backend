import React, { useEffect, useState } from "react";
import API from "../../services/api";
import PostCard from "../../components/PostCard";
import SkeletonPost from "../../components/SkeletonPost";
import TrendingPosts from "../../components/TrendingPosts";
import PostEditor from "../../components/PostEditor";
import SearchBar from "../../components/SearchBar";

export default function Dashboard() {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const res = await API.get("/posts");

      const postsArray = Array.isArray(res.data)
        ? res.data
        : res.data.posts || [];

      setPosts(postsArray);

    } catch (err) {
      console.error(err);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (

    <div className="max-w-7xl mx-auto px-4">

      {/* SEARCH */}
      <SearchBar setPosts={setPosts} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* MAIN FEED */}
        <div className="lg:col-span-2 space-y-6">

          <PostEditor onPostCreated={fetchPosts} />

          <h2 className="text-2xl font-bold">Latest Posts</h2>

          <div className="grid sm:grid-cols-2 gap-6">

            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonPost key={i} />
                ))
              : posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}

          </div>

        </div>

        {/* SIDEBAR */}
        <div className="space-y-6">

          <TrendingPosts />

          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-bold mb-2">Categories</h3>

            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-200 px-3 py-1 rounded">Tech</span>
              <span className="bg-gray-200 px-3 py-1 rounded">Programming</span>
              <span className="bg-gray-200 px-3 py-1 rounded">Design</span>
              <span className="bg-gray-200 px-3 py-1 rounded">AI</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
