import Link from "next/link";
import React from "react";

const Card = ({ item }) => {
  const { _id, image_url, title, short_description, price, currency, date, priority } = item;

  return (
    <div className="w-full max-w-sm bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 mx-auto">
      {/* Image */}
      <img
        src={image_url}
        alt={title}
        className="w-full h-48 object-cover"
      />

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h2 className="text-lg text-black font-semibold mb-2">{title}</h2>

        {/* Short Description */}
        <p className="text-gray-600 text-sm line-clamp-2">{short_description}</p>

        {/* Meta Info */}
        <div className="flex items-center justify-between mt-3">
          {/* Price */}
          <span className="text-blue-600 font-semibold">
            💲 {price} {currency}
          </span>

          {/* Priority Badge */}
          <span
            className={`px-2 py-1 rounded text-white text-xs ${
              priority === "High"
                ? "bg-red-500"
                : priority === "Medium"
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
          >
            {priority}
          </span>
        </div>

        {/* Date */}
        <p className="text-gray-500 text-xs mt-2">📅 {date}</p>

        {/* Button */}
        <Link href={`/course-details/${_id}`}>
          <div className="mt-4 w-full text-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
            View Details
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Card;
