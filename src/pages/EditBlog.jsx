import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import JoditEditor from "jodit-react";
import { api_base_url } from "../helper";
import { useParams } from "react-router-dom";

const EditBlog = () => {
  const { blogId } = useParams();
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminSecret, setAdminSecret] = useState("");
  const [error, setError] = useState("");

  const checkAdmin = () => {
    if (adminSecret !== "") {
      if (adminSecret === "admin1234") {
        setIsAdmin(true);
        setError("");
      } else {
        setError("Invalid admin secret !");
      }
    } else {
      setError("Please provide admin secret !");
    }
  };

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const editor = useRef(null);

  useEffect(() => {
    fetch(api_base_url + "/api/blogs/getBlog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blogId, token: localStorage.getItem("token") }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTitle(data.blog.title);
          setDesc(data.blog.desc);
          setContent(data.blog.content);
        } else {
          console.error("Failed to fetch blog:", data.msg);
          alert("Error loading blog: " + data.msg);
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        alert("Network error loading blog");
      });
  }, [blogId]);

  const updateBlog = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("content", content);
    formData.append("blogId", blogId);
    formData.append("token", localStorage.getItem("token"));
    if (image) formData.append("image", image);

    fetch(api_base_url + "/api/blogs/updateBlog", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Blog updated successfully");
          window.location.href = `/blog/${blogId}`;
        } else {
          alert(data.msg);
        }
      });
  };

  return (
    <>
      {!isAdmin ? (
        <div className="con flex items-center justify-center flex-col h-screen px-4">
          <div className="w-full sm:w-[80%] md:w-[50%] lg:w-[25vw] flex flex-col rounded-xl p-5 md:p-[20px] bg-[#0F0E0E]">
            <h3 className="text-2xl mb-4">Login to edit blog</h3>

            <div className="inputBox">
              <input
                onChange={(e) => setAdminSecret(e.target.value)}
                value={adminSecret}
                type="text"
                placeholder="Enter admin secret"
              />
            </div>

            <p className="text-red-500 text-[13px]">{error}</p>

            <button className="btnNormal mt-3" onClick={checkAdmin}>
              Login
            </button>
          </div>
        </div>
      ) : (
        <>
          <Navbar />
          <div className="px-4 sm:px-6 md:px-8 lg:px-[100px] py-4">
            <h3>Edit Blog</h3>
            <form onSubmit={updateBlog}>
              <div className="inputBox">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="Enter title"
                />
              </div>
              <div className="inputBox">
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Enter Description"
                ></textarea>
              </div>
              <JoditEditor
                ref={editor}
                className="text-black mt-2"
                value={content}
                tabIndex={1}
                onChange={(newContent) => setContent(newContent)}
              />
              <input
                type="file"
                className="my-3"
                onChange={(e) => setImage(e.target.files[0])}
                id="file"
              />{" "}
              <br />
              <button className="btnNormal mt-3">Update Blog</button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default EditBlog;
