// src/components/PostCard.jsx
import React, { useState } from "react";
import API from "../services/api";

export default function PostCard({ post, isTrending, currentUser }) {
  const { _id, title, content, image, author, likes, bookmarks, views } = post;

  // Initial state based on current user
  const initialLiked = likes.includes(currentUser?._id);
  const initialBookmarked = bookmarks.includes(currentUser?._id);

  const [liked, setLiked] = useState(initialLiked);
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [likesCount, setLikesCount] = useState(likes.length);
  const [bookmarksCount, setBookmarksCount] = useState(bookmarks.length);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLike = async () => {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);

    try {
      await API.post(`/posts/${_id}/like`);
    } catch (err) {
      console.error(err);
      // revert on error
      setLiked(liked);
      setLikesCount(likesCount);
    }
  };

  const handleBookmark = async () => {
    setBookmarked(!bookmarked);
    setBookmarksCount(bookmarked ? bookmarksCount - 1 : bookmarksCount + 1);

    try {
      await API.post(`/posts/${_id}/bookmark`);
    } catch (err) {
      console.error(err);
      // revert on error
      setBookmarked(bookmarked);
      setBookmarksCount(bookmarksCount);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      
      {/* Image with skeleton */}
      <div className="relative w-full h-48 bg-gray-200">
        {image && (
          <>
            {!imageLoaded && <div className="absolute inset-0 bg-gray-300 animate-pulse" />}
            <img
              src={image}
              alt={title}
              className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
            />
          </>
        )}
      </div>

      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p
          className="text-gray-700 mb-2 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <div className="flex justify-between items-center text-sm text-gray-500 mt-3">
          <button onClick={handleLike} className="hover:text-blue-600">
            👍 {likesCount} {liked && "(You liked)"}
          </button>
          <button onClick={handleBookmark} className="hover:text-yellow-600">
            🔖 {bookmarksCount} {bookmarked && "(Bookmarked)"}
          </button>
          <span>👁️ {views}</span>
          {isTrending && <span className="text-red-500 font-bold">🔥 Trending</span>}
        </div>

        <div className="mt-3 flex items-center">
          <img
            src={author.avatar}
            alt={author.name}
            className="w-6 h-6 rounded-full mr-2"
            loading="lazy" // lazy avatar
          />
          <span className="text-gray-600 text-sm">{author.name}</span>
        </div>
      </div>
    </div>
  );
}