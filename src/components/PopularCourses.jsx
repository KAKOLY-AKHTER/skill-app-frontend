"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Card";

export default function PopularCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(
          "https://skills-dev-platform-server.onrender.com/popular-skills"
        );
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error("Failed to load courses:", err);
      }
    };

    loadData();
  }, []);

  return (
    <section className="mt-10 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-500">
            Popular Courses
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Explore our top-rated courses and start learning today.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {courses.length > 0 ? (
            courses.map((course) => <Card key={course._id} item={course} />)
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              Loading courses...
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
