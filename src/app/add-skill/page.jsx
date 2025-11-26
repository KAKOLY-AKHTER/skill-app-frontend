"use client";

import { AuthContext } from "@/Context/AuthProvider";
import PrivateRoute from "@/Context/PrivateRoute";
import { useContext, useState } from "react";
import Swal from "sweetalert2";

const AddCourse = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      name: e.target.name.value,
      category: e.target.category.value,
      description: e.target.description.value,
      thumbnailUrl: e.target.thumbnailUrl.value,
      created_at: new Date(),
      created_by: user.email,
    };

    fetch("https://skills-dev-platform-server.onrender.com/skills", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          title: "Success!",
          html: `Your <span class="font-bold text-blue-600">${formData.name}</span> course has been added successfully.`,
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong. Please try again.",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <PrivateRoute>
      <div className="p-8 max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold text-blue-600 mb-6 text-center">
          Add a new course
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 bg-white p-6 shadow-lg rounded-xl"
        >
          {/* Course Name */}
          <div>
            <label className="block font-semibold text-blue-600 mb-1">
              Course Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter course name"
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-semibold text-blue-600 mb-1">
              Category
            </label>
            <select
              name="category"
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="">Select Category</option>
              <option value="Math">Math</option>
              <option value="Science">Science</option>
              <option value="Programming">Programming</option>
              <option value="Design">Design</option>
              <option value="Business">Business</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold text-blue-600 mb-1">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Enter a detailed course description"
              rows="4"
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Thumbnail URL */}
          <div>
            <label className="block font-semibold text-blue-600 mb-1">
              Thumbnail URL
            </label>
            <input
              type="text"
              name="thumbnailUrl"
              placeholder="https://example.com/image.jpg"
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white font-semibold transition-all ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Adding..." : "Add Course"}
          </button>
        </form>
      </div>
    </PrivateRoute>
  );
};

export default AddCourse;
