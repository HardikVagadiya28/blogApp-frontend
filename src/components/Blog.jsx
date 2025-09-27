import React from "react";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { api_base_url } from "../helper";

const Blog = ({ data, showInteractions = true }) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        onClick={() => {
          navigate(`/blog/${data._id}`);
        }}
        className="blog cursor-pointer bg-white rounded-lg shadow-md overflow-hidden p-3 hover:shadow-lg transition w-full h-full flex flex-col"
      >
        <img
          className="w-full h-[120px] xs:h-[150px] sm:h-[180px] md:h-[200px] object-cover rounded-md mb-3"
          src={`${api_base_url}/uploads/${data.image}`}
          alt={data.title}
        />

        <div className="flex justify-between items-center mb-2 flex-wrap gap-1">
          <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded">
            {data.category}
          </span>
          {data.subcategory && (
            <span className="text-xs bg-purple-800 text-white px-2 py-1 rounded">
              {data.subcategory}
            </span>
          )}
        </div>

        <h3 className="text-sm xs:text-base sm:text-lg font-semibold mb-2 line-clamp-2 min-h-[2.8rem]">
          {data.title}
        </h3>

        <p
          className="text-gray-600 text-xs xs:text-sm mb-2 flex-grow"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            lineHeight: "1.5em",
            maxHeight: "3em",
          }}
        >
          {data.desc}
        </p>

        {showInteractions && (
          <div className="flex items-center gap-1 text-gray-400 text-xs xs:text-sm mt-auto">
            <FavoriteIcon fontSize="small" />
            <span>{data.likes?.length || 0} likes</span>
            <span className="mx-2">•</span>
            <span>{data.comments?.length || 0} comments</span>
          </div>
        )}
      </div>
    </>
  );
};

export default Blog;
