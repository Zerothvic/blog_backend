import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../services/api";
import Comments from "../../components/Comments";
import LikeButton from "../../components/LikeButton";

function Post(){

  const { id } = useParams();

  const [post,setPost] = useState(null);

  useEffect(()=>{

    const fetchPost = async ()=>{

      const res = await API.get(`/posts/${id}`);

      setPost(res.data);

    }

    fetchPost();

  },[id]);

  if(!post) return <p>Loading...</p>;

  return(

    <div>

      <h1>{post.title}</h1>

      <p>{post.content}</p>

      <LikeButton postId={id} />

      <Comments postId={id} />

    </div>

  )

}

export default Post;
