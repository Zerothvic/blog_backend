
import { useState, useEffect } from "react";
import API from "../services/api";

export default function FollowButton({ authorId }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    const checkFollowing = async () => {
      const res = await API.get(`/auth/${authorId}/followers`);
      setFollowing(res.data.includes(user?.id));
    };
    checkFollowing();
  }, [authorId]);

 const toggleFollow = async () => {
  try {
    await API.post(`/auth/${authorId}/follow`);
    setFollowing(!following);
  } catch (err) {
    console.error(err);
  }
};


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
