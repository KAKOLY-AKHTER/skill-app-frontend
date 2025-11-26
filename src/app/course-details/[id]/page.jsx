"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";

export default function CourseDetails() {
  const { id } = useParams();
  const router = useRouter();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/skills/${id}`);
        const data = await res.json();

        if (data.success && data.result) {
          setItem(data.result);
        } else {
          setItem(null);
        }
      } catch (err) {
        console.error(err);
        setItem(null);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!item) {
    return (
      <h1 className="p-6 text-red-600 text-center text-xl">
        Course Not Found ❌
      </h1>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Banner Image */}
      <img
        src={item.image_url}
        className="w-full h-64 object-cover rounded-xl shadow mb-6"
        alt={item.title}
      />

      {/* Title */}
      <h1 className="text-3xl font-bold text-blue-600 mb-4">{item.title}</h1>

      {/* Full Description */}
      <p className="text-lg text-gray-700 mb-4">{item.full_description}</p>

      {/* Meta Info */}
      <div className="space-y-2 text-gray-800 mb-6">
        <p>
          <span className="font-semibold">💲 Price:</span> {item.price}{" "}
          {item.currency}
        </p>
        <p>
          <span className="font-semibold">📅 Date:</span> {item.date}
        </p>
        <p>
          <span className="font-semibold">⚡ Priority:</span>{" "}
          <span
            className={`px-2 py-1 rounded text-white text-xs ${
              item.priority === "High"
                ? "bg-red-500"
                : item.priority === "Medium"
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
          >
            {item.priority}
          </span>
        </p>
        <p>
          <span className="font-semibold">👤 Created By:</span> {item.created_by}
        </p>
        <p>
          <span className="font-semibold">⏰ Created At:</span>{" "}
          {new Date(item.created_at).toLocaleString()}
        </p>
      </div>

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mt-6 px-4 py-2 border-2 rounded-lg hover:bg-gray-200 transition"
      >
        ⬅ Back
      </button>
    </div>
  );
}
