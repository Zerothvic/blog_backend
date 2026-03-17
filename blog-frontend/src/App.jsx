import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Dashboard from "./pages/dashboard/Dashboard";
import Post from "./pages/dashboard/Post";
import CreatePost from "./pages/dashboard/CreatePost";

import Profile from "./pages/dashboard/Profile";
import Bookmarks from "./pages/dashboard/Bookmarks";
import Trending from "./pages/dashboard/Trending";
import MyPosts from "./pages/dashboard/MyPosts";
import Notifications from "./pages/dashboard/Notification";

import ProtectedRoute from "./components/ProtectedRoutes";
import DashboardLayout from "./layouts/DashboardLayout";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* AUTH ROUTES */}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED DASHBOARD */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >

          {/* Dashboard Home */}
          <Route index element={<Dashboard />} />

          {/* Create Post */}
          <Route path="create" element={<CreatePost />} />

          {/* Single Post */}
          <Route path="post/:id" element={<Post />} />

          {/* Author profile */}
         <Route path="/profile/:id" element={<Profile />} />

          {/* Bookmarks */}
          <Route path="bookmarks" element={<Bookmarks />} />

          {/* Trending */}
          <Route path="trending" element={<Trending />} />

          {/* My posts */}
          <Route path="my-posts" element={<MyPosts />} />

          <Route path="/notifications" element={<Notifications />} />



        </Route>

      </Routes>

    </BrowserRouter>

  );

}

export default App;