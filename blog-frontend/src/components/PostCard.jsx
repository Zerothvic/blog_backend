
import React, { useState, useEffect } from "react";
import API from "../services/api";


function FollowButton({ authorId }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    const checkFollowing = async () => {
      if (!user?.id) return;
      try {
        console.log("Fetching followers for user:", authorId);
        const res = await API.get(`/auth/${authorId}/followers`);
        console.log("Followers fetched:", res.data);
        setFollowing(res.data.includes(user.id));
      } catch (err) {
        console.error("Error fetching followers:", err);
      }
    };
    checkFollowing();
  }, [authorId, user?.id]);

  const toggleFollow = async () => {
    if (!user?.id) return;
    try {
      console.log(following ? "Unfollowing..." : "Following...", authorId);
      await API.post(`/auth/${authorId}/follow`);
      setFollowing(!following);
      console.log("Follow toggle success:", !following);
    } catch (err) {
      console.error("Follow toggle failed:", err);
    }
  };

  if (user?.id === authorId) return null;

  return (
    <button
      onClick={toggleFollow}
      className={`px-3 py-1 rounded text-white ${
        following ? "bg-gray-500" : "bg-green-600 hover:bg-green-700"
      }`}
    >
      {following ? "Following" : "Follow"}
    </button>
  );
}

// Main PostCard
export default function PostCard({ post, isTrending }) {
  const { _id, title, content, image, author, likes = [], bookmarks = [], views } = post;
  const user = JSON.parse(localStorage.getItem("user"));

  const initialLiked = likes.includes(user?.id);
  const initialBookmarked = bookmarks.includes(user?.id);

  const [liked, setLiked] = useState(initialLiked);
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [likesCount, setLikesCount] = useState(likes.length);
  const [bookmarksCount, setBookmarksCount] = useState(bookmarks.length);
  const [imageLoaded, setImageLoaded] = useState(false);

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        console.log("Fetching comments for post:", _id);
        const res = await API.get(`/comments/${_id}`);
        console.log("Comments fetched:", res.data);
        setComments(res.data);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };
    fetchComments();
  }, [_id]);

  // Like
  const handleLike = async () => {
    const newLiked = !liked;
    console.log(newLiked ? "Liking post..." : "Unliking post...", _id);
    setLiked(newLiked);
    setLikesCount(newLiked ? likesCount + 1 : likesCount - 1);
    try {
      await API.post(`/posts/${_id}/like`);
      console.log("Like success!");
    } catch (err) {
      console.error("Like failed:", err);
      setLiked(!newLiked);
      setLikesCount(likesCount);
    }
  };

  // Bookmark
  const handleBookmark = async () => {
    const newBookmarked = !bookmarked;
    console.log(newBookmarked ? "Bookmarking..." : "Removing bookmark...", _id);
    setBookmarked(newBookmarked);
    setBookmarksCount(newBookmarked ? bookmarksCount + 1 : bookmarksCount - 1);
    try {
      await API.post(`/posts/${_id}/bookmark`);
      console.log("Bookmark success!");
    } catch (err) {
      console.error("Bookmark failed:", err);
      setBookmarked(!newBookmarked);
      setBookmarksCount(bookmarksCount);
    }
  };

  // Add comment
  const submitComment = async () => {
    if (!comment.trim()) return;
    console.log("Submitting comment:", comment);
    try {
      const res = await API.post(`/comments/${_id}`, { content: comment });
      console.log("Comment added:", res.data);
      setComments([...comments, res.data]);
      setComment("");
    } catch (err) {
      console.error("Comment failed:", err);
    }
  };

  const imageUrl = image ? `http://localhost:5000/${image}` : null;
  const avatarUrl = author?.avatar
    ? `http://localhost:5000/uploads/${author.avatar}`
    : "/assets/hero.png";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">

      {/* Post Image */}
      {imageUrl && (
        <div className="relative w-full h-48 bg-gray-200">
          {!imageLoaded && <div className="absolute inset-0 bg-gray-300 animate-pulse" />}
          <img
            src={imageUrl}
            alt={title}
            className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      )}

      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-700 mb-2 line-clamp-3" dangerouslySetInnerHTML={{ __html: content }} />

        {/* Actions */}
        <div className="flex justify-between items-center text-sm text-gray-500 mt-3">
          <button onClick={handleLike} className="hover:text-blue-600">👍 {likesCount}</button>
          <button onClick={handleBookmark} className="hover:text-yellow-600">🔖 {bookmarksCount}</button>
          <span>👁️ {views}</span>
          {isTrending && <span className="text-red-500 font-bold">🔥 Trending</span>}
        </div>

        {/* Author + Follow */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={avatarUrl}
              alt={author?.username}
              className="w-8 h-8 rounded-full mr-2 object-cover"
              loading="lazy"
            />
            <span className="text-gray-600 text-sm font-medium">{author?.username}</span>
          </div>
          <FollowButton authorId={author?._id} />
        </div>

        {/* Comments */}
        <div className="mt-4 border-t pt-2">
          <h3 className="text-sm font-semibold mb-1">Comments</h3>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 border rounded px-2 py-1"
            />
            <button onClick={submitComment} className="bg-blue-600 text-white px-3 py-1 rounded">
              Post
            </button>
          </div>
          {comments.map((c) => (
            <div key={c._id} className="text-sm mb-1">
              <b>{c.author.username}</b>: {c.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
