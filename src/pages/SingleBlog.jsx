import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { api_base_url } from "../helper";
import { useParams, useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SendIcon from "@mui/icons-material/Send";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const SingleBlog = () => {
  const [data, setData] = useState(null);
  const [userLiked, setUserLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { blogId } = useParams();
  const navigate = useNavigate();

  const getBlogWithComments = () => {
    setLoading(true);
    setError("");
    fetch(api_base_url + "/api/blogs/getBlogWithComments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        blogId: blogId,
        token: localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setData(data.blog);
          setUserLiked(data.userLiked);
          setLikesCount(data.blog.likes.length);
          setComments(data.blog.comments || []);
        } else {
          setError(data.msg || "Failed to load blog");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blog:", error);
        setError("Error loading blog. Please try again.");
        setLoading(false);
      });
  };

  const toggleLike = async () => {
    try {
      console.log("Toggle Like - Blog ID:", blogId);

      const response = await fetch(`${api_base_url}/api/blogs/toggleLike`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ blogId }),
      });

      const data = await response.json();
      console.log("Toggle Like - Response:", data);

      if (data.success) {
        setUserLiked(data.liked);
        setLikesCount(data.likesCount);
      } else {
        alert(data.msg || "Failed to toggle like");
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      alert("Error updating like");
    }
  };

  const addComment = () => {
    if (!newComment.trim()) return;

    fetch(api_base_url + "/api/blogs/addComment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        blogId: blogId,
        comment: newComment,
        token: localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setComments(data.comments);
          setNewComment("");
          getBlogWithComments();
        } else {
          alert(data.msg);
        }
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
        alert("Error adding comment");
      });
  };

  const deleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) {
      return;
    }

    try {
      const res = await fetch(api_base_url + "/api/blogs/deleteBlog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          blogId: id,
          token: localStorage.getItem("token"),
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Blog deleted successfully!");
        navigate("/blogs");
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog");
    }
  };

  useEffect(() => {
    getBlogWithComments();
  }, [blogId]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <span className="ml-3">Loading blog...</span>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col justify-center items-center min-h-screen px-4">
          <div className="text-red-500 text-xl mb-4">Error</div>
          <div className="text-gray-400 mb-6">{error}</div>
          <button onClick={() => navigate("/blogs")} className="btnNormal">
            Back to Blogs
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="single-blog px-4 sm:px-6 md:px-8 lg:px-[100px] mt-4">
        {data && (
          <>
            <div className="flex flex-col md:flex-row w-full min-h-[400px] pt-5">
              <div className="left w-full md:w-[40%] h-full mb-4 md:mb-0">
                <img
                  className="w-full h-64 md:h-80 object-cover rounded-lg"
                  src={data.image}
                  alt={data.title}
                />
              </div>
              <div className="md:ml-6 flex-1">
                <h3 className="text-3xl font-[500] mb-4">{data.title}</h3>
                <p className="text-gray-400 text-sm mb-3">
                  Created: {new Date(data.date).toLocaleDateString()}
                </p>
                <p className="text-gray-400 text-sm mb-3">
                  By:{" "}
                  {data.user?.name || data.user?.username || "Unknown Author"}
                </p>

                <div className="mb-4">
                  <span className="font-semibold">Description:</span>
                  <p className="text-gray-300 mt-2">{data.desc}</p>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <button
                    onClick={toggleLike}
                    className="flex items-center gap-2 bg-transparent border-none cursor-pointer hover:scale-110 transition-transform"
                  >
                    {userLiked ? (
                      <FavoriteIcon className="text-red-500" fontSize="large" />
                    ) : (
                      <FavoriteBorderIcon
                        className="text-gray-400"
                        fontSize="large"
                      />
                    )}
                    <span className="text-gray-400 text-lg">
                      {likesCount} likes
                    </span>
                  </button>
                </div>

                <div className="mt-5 flex gap-3">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
                    onClick={() => navigate(`/editBlog/${blogId}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
                    onClick={() => deleteBlog(blogId)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 prose prose-invert max-w-none">
              {parse(data.content)}
            </div>

            <div className="mt-8 border-t border-gray-700 pt-6">
              <h4 className="text-xl font-semibold mb-4">
                Comments ({comments.length})
              </h4>

              <div className="flex gap-3 mb-6">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 p-3 bg-gray-900 text-white rounded-lg border border-gray-700 focus:border-purple-600 focus:outline-none"
                  onKeyPress={(e) => e.key === "Enter" && addComment()}
                />
                <button
                  onClick={addComment}
                  disabled={!newComment.trim()}
                  className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <SendIcon fontSize="small" />
                  Post
                </button>
              </div>

              <div className="space-y-4">
                {comments.map((comment) => (
                  <div
                    key={comment._id}
                    className="flex gap-3 p-4 bg-gray-900 rounded-lg"
                  >
                    <AccountCircleIcon
                      className="text-gray-400"
                      fontSize="large"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-white">
                          {comment.user?.name ||
                            comment.user?.username ||
                            "Unknown User"}
                        </span>
                        <span className="text-gray-400 text-sm">
                          {new Date(comment.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-300">{comment.text}</p>
                    </div>
                  </div>
                ))}

                {comments.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    <AccountCircleIcon
                      fontSize="large"
                      className="mx-auto mb-2"
                    />
                    <p>No comments yet. Be the first to comment!</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SingleBlog;
