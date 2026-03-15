import { useState } from "react";
import API from "../services/api";

export default function SearchBar({ setPosts }) {
  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value) return;

    const res = await API.get(`/posts/search?q=${value}`);
    setPosts(res.data);
  };

  return (
    <div className="max-w-4xl mx-auto my-6">
      <input
        type="text"
        placeholder="Search articles..."
        value={query}
        onChange={handleSearch}
        className="w-full border rounded-lg p-3 focus:outline-none focus:ring"
      />
    </div>
  );
}
