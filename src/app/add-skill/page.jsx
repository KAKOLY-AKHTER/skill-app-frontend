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
      title: e.target.title.value,
      short_description: e.target.short_description.value,
      full_description: e.target.full_description.value,
      price: parseFloat(e.target.price.value),
      currency: "USD",
      date: e.target.date.value,
      priority: e.target.priority.value,
      image_url: e.target.image_url.value || null,
      created_at: new Date(),
      created_by: user.email,
    };

    fetch("http://localhost:3000/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          title: "Success!",
          html: `Your <span class="font-bold text-blue-600">${formData.title}</span> course has been added successfully.`,
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
        e.target.reset();
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong. Please try again.",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      })
      .finally(() => setLoading(false));
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
          {/* Title */}
          <div>
            <label className="block font-semibold text-blue-600 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter course title"
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Short Description */}
          <div>
            <label className="block font-semibold text-blue-600 mb-1">
              Short Description
            </label>
            <input
              type="text"
              name="short_description"
              placeholder="Enter a short description"
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Full Description */}
          <div>
            <label className="block font-semibold text-blue-600 mb-1">
              Full Description
            </label>
            <textarea
              name="full_description"
              placeholder="Enter a detailed description"
              rows="4"
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block font-semibold text-blue-600 mb-1">
              Price (USD)
            </label>
            <input
              type="number"
              name="price"
              placeholder="Enter price in USD"
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block font-semibold text-blue-600 mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block font-semibold text-blue-600 mb-1">
              Priority
            </label>
            <select
              name="priority"
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="">Select Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Image URL */}
          <div>
            <label className="block font-semibold text-blue-600 mb-1">
              Image URL (optional)
            </label>
            <input
              type="text"
              name="image_url"
              placeholder="https://example.com/image.jpg"
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

