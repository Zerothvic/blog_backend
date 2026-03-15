import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";
import PostCard from "../../components/PostCard";

export default function Profile() {
  const { id } = useParams();

  const [author, setAuthor] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        // Fetch user data
        const userRes = await API.get(`/auth/${id}`);
        setAuthor(userRes.data);

        // Fetch user posts
        const postRes = await API.get(`/posts/author/${id}`);
        setPosts(postRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [id]);

  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handle avatar upload
  const handleUpload = async () => {
    if (!selectedFile || !author) return;
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("avatar", selectedFile);

      const res = await API.post(`/posts/upload-avatar`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Update author with new avatar filename
      if (res.data?.avatar) {
        setAuthor((prev) => ({ ...prev, avatar: res.data.avatar }));
      }

      setSelectedFile(null);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  if (!author) return <div className="p-4">Loading author...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center gap-4 mb-6">
        {/* Current Avatar */}
     <img
  src={
    author?.avatar
      ? `http://localhost:5000/uploads/${encodeURIComponent(author.avatar)}`
      : "/assets/hero.png"
  }
  alt={author?.username}
  className="w-20 h-20 rounded-full object-cover"
/>



        <div>
          <h1 className="text-3xl font-bold">{author.username}</h1>
          <p className="text-gray-600">{author.email}</p>

          {/* Upload UI */}
          <div className="mt-2 flex items-center gap-2">
            <input type="file" onChange={handleFileChange} />
            <button
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      </div>

      {/* User Posts */}
      <h2 className="text-2xl font-bold mb-4">Posts by {author.username}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
