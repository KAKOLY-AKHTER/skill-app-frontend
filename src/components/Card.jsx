import Link from "next/link";
import React from "react";

const Card = ({ item }) => {
  console.log(item);
  const { _id, thumbnailUrl, name, description } = item;
  return (
    <div className="w-full max-w-sm bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 mx-auto">
      {/* Image */}
      <img src={thumbnailUrl} alt={name} className="w-full h-48 object-cover" />

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h2 className="text-lg text-black font-semibold mb-2">{name}</h2>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-2">{description}</p>

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
