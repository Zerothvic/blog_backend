import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../services/api";

function Post() {
  const { id } = useParams();
  const [post,setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await API.get(`/posts/${id}`);
      setPost(res.data);
    };

    fetchPost();
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">

      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

      {post.image && (
        <img
          src={`http://localhost:5000/${post.image}`}
          className="w-full rounded mb-4"
        />
      )}

      <div dangerouslySetInnerHTML={{__html:post.content}} />

    </div>
  );
}

export default Post;
