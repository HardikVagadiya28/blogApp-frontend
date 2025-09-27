import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import SingleBlog from "./pages/SingleBlog";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import UploadBlog from "./pages/UploadBlog";
import EditBlog from "./pages/EditBlog";
import About from "./pages/About";
import AdminContacts from "./pages/AdminContacts";
import Profile from "./pages/Profile";
import Blogs from "./pages/Blogs";

const App = () => {
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Home /> : <Navigate to={"/login"} />}
          />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/blog/:blogId"
            element={isLoggedIn ? <SingleBlog /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/uploadBlog"
            element={isLoggedIn ? <UploadBlog /> : <Navigate to={"/login"} />}
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/blogs"
            element={isLoggedIn ? <Blogs /> : <Navigate to={"/login"} />}
          />
          <Route path="/editBlog/:blogId" element={<EditBlog />} />
          <Route path="/admin/contacts" element={<AdminContacts />} />
          <Route
            path="/profile"
            element={isLoggedIn ? <Profile /> : <Navigate to={"/login"} />}
          />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
