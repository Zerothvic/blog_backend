import { useState } from "react";
import API from "../../services/api";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  
  const availableTags = ["Tech", "Lifestyle", "Travel", "Food", "News"];

  const submitPost = async (e) => {
    e.preventDefault();
    if (!title || !content || tags.length === 0) {
      return alert("Title, content, and at least one tag are required!");
    }

    setLoading(true);

    try {
     const formData = new FormData();

formData.append("title", title);
formData.append("content", content);
formData.append("tags", JSON.stringify(tags));

if (image) {
  formData.append("image", image);
}

const res = await API.post("/posts", formData, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});


      console.log(res.data);
      alert("Post created!");
      setTitle("");
      setContent("");
      setTags([]);
    } catch (err) {
      console.log("Post error:", err.response?.data);
      alert("Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

  const toggleTag = (tag) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <form onSubmit={submitPost} className="space-y-4 p-4 bg-white rounded shadow">
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded h-32"
      />

      <input
  type="file"
  accept="image/*"
  onChange={(e) => setImage(e.target.files[0])}
  className="w-full"
/>


      {/* Tag selector */}
      <div>
        <span className="font-semibold">Select Tags:</span>
        <div className="flex flex-wrap gap-2 mt-1">
          {availableTags.map((tag) => (
            <button
              type="button"
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full border ${
                tags.includes(tag)
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        {loading ? "Creating..." : "Create Post"}
      </button>
    </form>
  );
}

export default CreatePost;