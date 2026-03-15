// src/components/PostEditor.jsx
import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import API from "../services/api";


export default function PostEditor({ onPostCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Ref for ReactQuill editor
  const quillRef = useRef(null);

  const handleSubmit = async () => {
    if (!title || !content) return alert("Title and content required");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) formData.append("image", image);

    setLoading(true);
    try {
      const res = await API.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setTitle("");
      setContent("");
      setImage(null);

      // Clear Quill editor manually using ref
      if (quillRef.current) {
        quillRef.current.getEditor().setContents([]);
      }

      onPostCreated(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <input
        type="text"
        className="w-full p-2 border rounded mb-3"
        placeholder="Post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* ✅ Pass ref directly */}
      <ReactQuill
        ref={quillRef}
        value={content}
        onChange={setContent}
        className="mb-3"
        theme="snow"
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="mb-3"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? "Publishing..." : "Publish Post"}
      </button>
    </div>
  );
}