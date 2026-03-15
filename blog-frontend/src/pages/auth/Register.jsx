import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

function Login(){

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleRegister = async (e)=>{

    e.preventDefault();

    const res = await API.post("/auth/register",{
      email,
      password,
      username
    });

    localStorage.setItem("token",res.data.token);

    navigate("/");

  }

  return(

    <div>

      <h2>Register</h2>

      <form onSubmit={handleRegister}>

      
        <input
          type="username"
          placeholder="username"
          onChange={(e)=>setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button>Register</button>

      </form>

    </div>

  )

}

export default Login;
