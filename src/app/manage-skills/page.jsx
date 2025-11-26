"use client";

import PrivateRoute from "@/Context/PrivateRoute";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/Context/AuthProvider";
import Loader from "@/components/Loader";
import Link from "next/link";
import Swal from "sweetalert2";

const ManageProduct = () => {
  const { user } = useContext(AuthContext);
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch(
      `https://skills-dev-platform-server.onrender.com/my-skills?email=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setSkills(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  const handleUpdateSkill = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      name: e.target.name.value,
      category: e.target.category.value,
      description: e.target.description.value,
      thumbnailUrl: e.target.thumbnailUrl.value,
      created_at: selectedSkill.created_at, // preserve original date
      created_by: selectedSkill.created_by, // preserve original creator
    };

    fetch(
      `https://skills-dev-platform-server.onrender.com/skills/${selectedSkill._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSkills((prev) =>
            prev.map((item) =>
              item._id === selectedSkill._id ? { ...item, ...formData } : item
            )
          );

          Swal.fire({
            icon: "success",
            title: "Updated!",
            html: `Your <span class="font-bold text-blue-500">${selectedSkill.name}</span> Skill has been updated successfully.`,
            timer: 2000,
            showConfirmButton: false,
          });

          setIsModalOpen(false);
        }
        setLoading(false);
      })

      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleDelete = (skill) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://skills-dev-platform-server.onrender.com/skills/${skill._id}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            setSkills((prev) => prev.filter((s) => s._id !== skill._id));

            Swal.fire({
              title: "Deleted!",
              html: `Your <span class="font-bold text-red-500">${skill.name}</span> Skill has been deleted.`,
              icon: "success",
            });
          })
          .catch((err) => console.log(err));
      }
    });
  };

  if (loading) return <Loader />;

  return (
    <PrivateRoute>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">My Skills</h1>

        {skills.length === 0 ? (
          <p className="text-gray-600">You haven't added any courses yet.</p>
        ) : (
          <div className="grid gap-5">
            {skills.map((skill) => (
              <div
                key={skill._id}
                className="flex flex-col sm:flex-col md:flex-row justify-between items-start md:items-center border rounded-xl p-4 shadow bg-white"
              >
                {/* IMAGE */}
                <img
                  src={skill.thumbnailUrl}
                  alt={skill.name}
                  className="w-full sm:w-full md:w-40 h-32 object-cover rounded-md shadow mb-3 md:mb-0"
                />

                {/* DETAILS */}
                <div className="flex-1 md:ml-4">
                  <h2 className="text-lg md:text-xl font-bold text-blue-600">
                    {skill.name}
                  </h2>
                  <p className="text-gray-700 text-sm mt-1">
                    <span className="font-semibold">Category:</span>{" "}
                    {skill.category}
                  </p>
                  <p className="text-gray-700 text-sm mt-1">
                    <span className="font-semibold">Created By:</span>{" "}
                    {skill.created_by}
                  </p>
                  <p className="text-gray-700 text-sm mt-1">
                    <span className="font-semibold">Created At:</span>{" "}
                    {new Date(skill.created_at).toLocaleString()}
                  </p>
                </div>

                {/* BUTTONS */}
                <div className="flex flex-wrap gap-2 mt-3 md:mt-0">
                  <button
                    onClick={() => {
                      setSelectedSkill(skill);
                      setIsModalOpen(true);
                    }}
                    className="px-4 py-1 rounded bg-green-500 text-white hover:bg-green-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(skill)}
                    className="px-4 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <Link
                    href={`/course-details/${skill._id}`}
                    className="px-4 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-[420px]">
              <h2 className="text-2xl font-bold mb-4 text-blue-600">
                Edit Course
              </h2>

              <form onSubmit={handleUpdateSkill} className="space-y-5 bg-white">
                {/* Course Name */}
                <div>
                  <label className="block font-semibold text-blue-600 mb-1">
                    Course Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={selectedSkill?.name}
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
                    defaultValue={selectedSkill?.category}
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
                    defaultValue={selectedSkill?.description}
                    rows="4"
                    required
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                </div>

                {/* Thumbnail */}
                <div>
                  <label className="block font-semibold text-blue-600 mb-1">
                    Thumbnail URL
                  </label>
                  <input
                    type="text"
                    name="thumbnailUrl"
                    defaultValue={selectedSkill?.thumbnailUrl}
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                </div>

                {/* Buttons */}
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Close
                  </button>

                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </PrivateRoute>
  );
};

export default ManageProduct;
