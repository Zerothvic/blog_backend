import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../services/api";

function Register(){

  const navigate = useNavigate();

  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleRegister = async (e)=>{

    e.preventDefault();

    try{

      const res = await API.post("/auth/register",{
        username,
        email,
        password
      });

      localStorage.setItem("token",res.data.token);
      localStorage.setItem("user",JSON.stringify(res.data.user));

      navigate("/");

    }catch(err){
      console.error(err);
      alert(err.response?.data?.message || "Registration failed");
    }

  }

  return(

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h2>

        <form
          onSubmit={handleRegister}
          className="flex flex-col gap-4"
        >

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          <button
            type="submit"
            className="bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition"
          >
            Register
          </button>

        </form>

        <p className="text-center text-gray-600 mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-black font-semibold">
            Login
          </Link>
        </p>

      </div>

    </div>
  )

}

export default Register;
