import { useState } from "react";
import API from "../services/api";

function LikeButton({ postId }){

  const [likes,setLikes] = useState(0);

  const likePost = async ()=>{

    const res = await API.post(`/posts/${postId}/like`);

    setLikes(res.data.likes);

  }

  return(

    <button onClick={likePost}>
      ❤️ {likes}
    </button>

  )

}

export default LikeButton;
