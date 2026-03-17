import { useEffect, useState } from "react";
import API from "../../services/api";
import PostCard from "../../components/PostCard";

export default function Bookmarks() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {

    const fetchBookmarks = async () => {
      try {

        const res = await API.get("/posts/bookmarks");
        setPosts(res.data);

      } catch (err) {
        console.error(err);
      }
    };

    fetchBookmarks();

  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        🔖 Your Bookmarks
      </h1>

      {posts.length === 0 ? (
        <p>No bookmarked posts yet</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map(post => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}

    </div>
  );
}
