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
        const res = await fetch(
          `https://skills-dev-platform-server.onrender.com/skills/${id}`
        );
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
    <div className="p-6 max-w-2xl mx-auto">
      {/* Title */}
      <h1 className="text-3xl font-bold text-blue-500 mb-4">{item.name}</h1>

      {/* Thumbnail */}
      <img
        src={item.thumbnailUrl}
        className="w-full rounded-xl shadow mb-4"
        alt={item.name}
      />

      {/* Description */}
      <p className="text-lg text-gray-700 mb-4">{item.description}</p>

      {/* Show All Data */}
      <div className="space-y-2 text-gray-800">
        <p>
          <span className="font-semibold">Category:</span> {item.category}
        </p>
        <p>
          <span className="font-semibold">Created By:</span> {item.created_by}
        </p>
        <p>
          <span className="font-semibold">Created At:</span>{" "}
          {new Date(item.created_at).toLocaleString()}
        </p>
      </div>

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mt-6 px-4 py-2 border-2 rounded-lg hover:bg-gray-300 transition"
      >
        ⬅ Back
      </button>
    </div>
  );
}
