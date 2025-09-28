import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { api_base_url } from "../helper";
import Pagination from "../components/Pagination";

const Blogs = () => {
  const [data, setData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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

  const getBlogs = (page = 1) => {
    setLoading(true);
    fetch(api_base_url + "/api/blogs/getBlogs", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page: page,
        limit: 8,
        token: localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setData(data.blogs);
          setCurrentPage(data.currentPage);
          setTotalPages(data.totalPages);
          setTotalBlogs(data.totalBlogs);
        } else {
          alert(data.msg);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const getBlogsByCategory = (page = 1) => {
    setLoading(true);
    fetch(api_base_url + "/api/blogs/getBlogsByCategory", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        category: selectedCategory,
        subcategory: selectedSubcategory,
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
          setTotalBlogs(data.totalBlogs);
        } else {
          alert(data.msg);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const searchBlogs = (page = 1) => {
    if (!searchQuery.trim()) {
      if (selectedCategory === "All") {
        getBlogs(page);
      } else {
        getBlogsByCategory(page);
      }
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    setLoading(true);
    fetch(api_base_url + "/api/blogs/searchBlogs", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        searchQuery: searchQuery,
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
          setTotalBlogs(data.totalBlogs);
        } else {
          alert(data.msg);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    searchBlogs(1);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
    setCurrentPage(1);
    if (selectedCategory === "All") {
      getBlogs(1);
    } else {
      getBlogsByCategory(1);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    if (isSearching) {
      searchBlogs(newPage);
    } else if (selectedCategory === "All") {
      getBlogs(newPage);
    } else {
      getBlogsByCategory(newPage);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    setCurrentPage(1);
    if (selectedCategory === "All") {
      getBlogs(1);
    } else {
      getBlogsByCategory(1);
    }

    const category = categories.find((cat) => cat.name === selectedCategory);
    if (category) {
      setSubcategories(category.subcategories);
    }
  }, [selectedCategory, selectedSubcategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory("");
    setSearchQuery("");
    setIsSearching(false);
    setCurrentPage(1);
  };

  const handleSubcategoryChange = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setSearchQuery("");
    setIsSearching(false);
    setCurrentPage(1);
  };

  const BlogWithBadges = ({ data }) => {
    const highlightText = (text, query) => {
      if (!query) return text;
      const regex = new RegExp(`(${query})`, "gi");
      return text.replace(
        regex,
        '<mark class="bg-yellow-300 text-black">$1</mark>'
      );
    };

    return (
      <div
        onClick={() => {
          navigate(`/blog/${data._id}`);
        }}
        className="blog cursor-pointer"
      >
        <img
          className="w-full h-[200px] object-cover rounded-lg mb-2"
          src={data.image}
          alt=""
        />

        <div className="flex justify-between items-center mb-2">
          <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded">
            {data.category}
          </span>
          {data.subcategory && (
            <span className="text-xs bg-purple-800 text-white px-2 py-1 rounded">
              {data.subcategory}
            </span>
          )}
        </div>

        <h3
          className="text-lg font-semibold mb-2 line-clamp-2"
          dangerouslySetInnerHTML={{
            __html: highlightText(data.title, isSearching ? searchQuery : ""),
          }}
        />

        <p
          className="text-[gray] text-[14px] mb-2"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            lineHeight: "1.4em",
            maxHeight: "2.8em",
          }}
          dangerouslySetInnerHTML={{
            __html: highlightText(data.desc, isSearching ? searchQuery : ""),
          }}
        />
      </div>
    );
  };

  return (
    <>
      <div>
        <Navbar />
        <div className="blogs-page flex flex-col lg:flex-row px-4 sm:px-6 md:px-8 lg:px-[100px] mt-4 mb-5">
          {/* Categories Sidebar */}
          <div className="categories-sidebar w-full lg:w-1/4 lg:pr-6 mb-6 lg:mb-0">
            <h3 className="text-xl sm:text-2xl mb-4">Categories</h3>

            {/* Search Input */}
            <div className="mb-6">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search blogs..."
                  className="w-full p-3 bg-[#0c0c0c] text-white rounded-lg border border-gray-700 pr-10"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <ClearIcon fontSize="small" />
                  </button>
                )}
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <SearchIcon fontSize="small" />
                </button>
              </form>
            </div>

            {/* Categories */}
            <div className="categories-list">
              {categories.map((category, index) => (
                <div key={index} className="category-item mb-3">
                  <button
                    className={`category-btn w-full text-left p-3 rounded-lg transition-all ${
                      selectedCategory === category.name
                        ? "bg-purple-600 text-white"
                        : "bg-[#0c0c0c] hover:bg-purple-700 hover:text-white"
                    }`}
                    onClick={() => handleCategoryChange(category.name)}
                  >
                    {category.name}
                  </button>

                  {selectedCategory === category.name &&
                    category.subcategories.length > 0 && (
                      <div className="subcategories-list ml-4 mt-2">
                        {category.subcategories.map((subcat, subIndex) => (
                          <button
                            key={subIndex}
                            className={`subcategory-btn w-full text-left p-2 rounded-lg transition-all text-sm mb-1 ${
                              selectedSubcategory === subcat
                                ? "bg-purple-500 text-white"
                                : "bg-[#0f0f0f] hover:bg-purple-600 hover:text-white"
                            }`}
                            onClick={() => handleSubcategoryChange(subcat)}
                          >
                            {subcat}
                          </button>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>

          {/* Blogs Content */}
          <div className="blogs-content w-full lg:w-3/4">
            <div className="header flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
              <h3 className="text-xl sm:text-2xl">
                {isSearching
                  ? `Search Results for "${searchQuery}"`
                  : selectedCategory === "All"
                  ? "All Blogs"
                  : selectedSubcategory
                  ? `${selectedSubcategory} Blogs`
                  : `${selectedCategory} Blogs`}
              </h3>
              <div className="flex items-center gap-4">
                <p className="text-gray-400 text-sm">
                  {totalBlogs} blog(s) total
                </p>
                <Link
                  to="/uploadBlog"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-all flex items-center gap-2 text-sm sm:text-base"
                >
                  Add Blog
                </Link>
              </div>
            </div>

            {loading && (
              <div className="text-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                <p className="text-gray-400 mt-2">Loading blogs...</p>
              </div>
            )}

            {!loading && isSearching && data && data.length === 0 && (
              <div className="text-center py-10 text-gray-400">
                No blogs found matching your search. Try different keywords.
              </div>
            )}

            {!loading && (
              <>
                <div className="blogs-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {data && data.length > 0 ? (
                    data.map((item, index) => (
                      <BlogWithBadges key={index} data={item} />
                    ))
                  ) : !isSearching ? (
                    <div className="col-span-full text-center py-10 text-gray-400">
                      No blogs found for this category.
                    </div>
                  ) : null}
                </div>

                {/* Pagination Component */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  className="mt-8"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogs;
