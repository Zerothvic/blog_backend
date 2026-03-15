import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import NotificationBell from "./NotificationBell";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const storedUser = JSON.parse(localStorage.getItem("user")) || {}; 
  const user = storedUser;

  return (
    <nav className="bg-black text-white px-8 py-4 flex justify-between items-center">

      <Link to="/" className="text-xl font-bold">
        ModernBlog
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/">Home</Link>
        <Link to="/create">Write</Link>
        <Link to="/trending">Trending</Link>
        <Link to="/bookmarks">Bookmarks</Link>

        <NotificationBell />
      </div>

      <div className="relative">
        <div
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img
            src={user.avatar || "https://i.pravatar.cc/40"}
            alt="avatar"
            className="w-9 h-9 rounded-full"
          />
          <span>{user.username}</span>
        </div>

       {menuOpen && (
  <div className="absolute right-0 mt-3 bg-white text-black rounded shadow w-40">

    <Link 
      to={`/profile/${user.id}`}
      className="block px-4 py-2 hover:bg-gray-100"
    >
      Profile
    </Link>

    <Link
      to="/my-posts"
      className="block px-4 py-2 hover:bg-gray-100"
    >
      My Posts
    </Link>

    <button
      onClick={logout}
      className="w-full text-left px-4 py-2 hover:bg-gray-100"
    >
      Logout
    </button>

  </div>
)}

      </div>
    </nav>
  );
}

export default Navbar;
