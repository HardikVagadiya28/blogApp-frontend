import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import JoditEditor from "jodit-react";
import { api_base_url } from "../helper";

const UploadBlog = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminSecret, setAdminSecret] = useState("");
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("All");
  const [subcategory, setSubcategory] = useState("");

  const editor = useRef(null);

  const categories = [
    {
      name: "All",
      subcategories: [],
    },
    {
      name: "Technology",
      subcategories: [
        "Web Development",
        "AI & Machine Learning",
        "Blockchain & Web3",
        "Cybersecurity",
        "Programming Tips & Tricks",
      ],
    },
    {
      name: "News",
      subcategories: [],
    },
    {
      name: "Education",
      subcategories: [],
    },
    {
      name: "Lifestyle",
      subcategories: [],
    },
    {
      name: "Business",
      subcategories: [],
    },
  ];

  const checkAdmin = () => {
    if (adminSecret !== "") {
      if (adminSecret === "admin1234") {
        setIsAdmin(true);
      } else {
        setError("Invalid admin secret !");
      }
    } else {
      setError("Please provide admin secret !");
    }
  };

  const submitForm = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in first");
      return;
    }

    let formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("subcategory", subcategory);

    if (image) {
      formData.append("image", image);
    }

    fetch(api_base_url + "/api/blogs/uploadBlog", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => {
        if (res.status === 401) {
          throw new Error("Authentication failed. Please log in again.");
        }
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          alert("Blog created successfully");
          setTitle("");
          setDesc("");
          setContent("");
          setImage("");
          setCategory("All");
          setSubcategory("");
          setError("");
        } else {
          setError(data.msg);
        }
      })
      .catch((error) => {
        console.error("Upload error:", error);
        setError(error.message || "Failed to create blog");
      });
  };

  return (
    <>
      {!isAdmin ? (
        <div className="con flex items-center justify-center flex-col h-screen px-4">
          <div className="w-full sm:w-[80%] md:w-[50%] lg:w-[25vw] flex flex-col rounded-xl p-5 md:p-[20px] bg-[#0F0E0E]">
            <h3 className="text-2xl mb-4">Login to upload blog</h3>

            <div className="inputBox">
              <input
                onChange={(e) => {
                  setAdminSecret(e.target.value);
                }}
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
            <h3>Upload Blog</h3>

            <form onSubmit={submitForm}>
              <div className="inputBox">
                <input
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  value={title}
                  type="text"
                  placeholder="Enter title"
                />
              </div>

              <div className="inputBox">
                <textarea
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                  value={desc}
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
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
                id="file"
              />

              <div className="inputBox mt-3">
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setSubcategory("");
                  }}
                  className="w-full p-2 bg-[#0c0c0c] text-white rounded border border-gray-700"
                >
                  {categories.map((cat, index) => (
                    <option key={index} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {category !== "All" &&
                categories.find((c) => c.name === category)?.subcategories
                  .length > 0 && (
                  <div className="inputBox mt-3">
                    <select
                      value={subcategory}
                      onChange={(e) => setSubcategory(e.target.value)}
                      className="w-full p-2 bg-[#0c0c0c] text-white rounded border border-gray-700"
                    >
                      <option value="">Select Subcategory</option>
                      {categories
                        .find((c) => c.name === category)
                        ?.subcategories.map((subcat, index) => (
                          <option key={index} value={subcat}>
                            {subcat}
                          </option>
                        ))}
                    </select>
                  </div>
                )}

              <br />
              <button className="btnNormal mt-3">Create Blog</button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default UploadBlog;
