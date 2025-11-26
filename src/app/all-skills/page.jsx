"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Card";
import Loader from "@/components/Loader";

export default function AllSkills() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const res = await fetch(
        "https://skills-dev-platform-server.onrender.com/skills"
      );
      const data = await res.json();
      setCourses(data);
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen font-sans p-6">
      <h1 className="text-center text-3xl sm:text-4xl font-extrabold text-blue-500 mb-4">
        All Courses
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courses.map((item) => (
          <Card key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}
