/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import API from "../services/api";

function Comments({ postId }){

  const [comments,setComments] = useState([]);
  const [text,setText] = useState("");

  const fetchComments = async ()=>{

    const res = await API.get(`/comments/${postId}`);

    setComments(res.data);

  }

  useEffect(()=>{

    fetchComments();

  },[]);

  const addComment = async ()=>{

    await API.post(`/comments/${postId}`,{
      content:text
    });

    setText("");

    fetchComments();

  }

  return(

    <div>

      <h3>Comments</h3>

      {comments.map((c)=>(
        <p key={c._id}>
          <b>{c.author.username}</b>: {c.content}
        </p>
      ))}

      <input
        value={text}
        onChange={(e)=>setText(e.target.value)}
        placeholder="Write comment"
      />

      <button onClick={addComment}>
        Comment
      </button>

    </div>

  )

}

export default Comments;
