import React, { useEffect, useState } from "react";
import Blog from "./Blog";
import { api_base_url } from "../helper";
import Pagination from "./Pagination";

const Blogs = () => {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const getBlogs = (page = 1) => {
    setLoading(true);
    fetch(api_base_url + "/api/blogs/getBlogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        page: page,
        limit: 8,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setData(data.blogs);
          setCurrentPage(data.currentPage);
          setTotalPages(data.totalPages);
        } else {
          alert(data.msg);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    getBlogs(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    getBlogs(1);
  }, []);

  return (
    <>
      <div className="blogs px-3 xs:px-4 sm:px-6 md:px-8 lg:px-[100px] mt-4 mb-5">
        <h3 className="text-xl sm:text-2xl">Latest Blogs</h3>

        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="text-gray-400 mt-2">Loading blogs...</p>
          </div>
        )}

        <div className="blogsCon mt-4 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-5">
          {!loading && data
            ? data.map((item) => (
                <Blog key={item._id} data={item} showInteractions={false} />
              ))
            : !loading && (
                <p className="col-span-full text-center py-8">
                  No Blogs Found!
                </p>
              )}
        </div>

        {/* Pagination for home page */}
        {!loading && data && data.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            className="mt-6 sm:mt-8"
          />
        )}
      </div>
    </>
  );
};

export default Blogs;
