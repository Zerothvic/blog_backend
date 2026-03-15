// src/components/TrendingPosts.jsx
import React, { useEffect, useState } from "react";
import API from "../services/api";
import PostCard from "./PostCard";
import SkeletonPost from "./SkeletonPost";

export default function TrendingPosts() {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrending = async () => {
    setLoading(true);
    try {
      const res = await API.get("/posts/trending");

      // Ensure trending is always an array
      const trendingArray = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.posts)
        ? res.data.posts
        : [];

      setTrending(trendingArray);
    } catch (err) {
      console.error("Failed to fetch trending posts:", err);
      setTrending([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Trending Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <SkeletonPost key={i} />)
          : trending.length > 0
          ? trending.map((post) => <PostCard key={post._id} post={post} isTrending />)
          : <div className="col-span-full text-center text-gray-500 py-6">
              No trending posts
            </div>
        }
      </div>
    </div>
  );
}