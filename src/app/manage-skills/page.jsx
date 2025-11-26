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

    fetch(`http://localhost:3000/skills?email=${user.email}`)
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
      title: e.target.title.value,
      short_description: e.target.short_description.value,
      full_description: e.target.full_description.value,
      price: parseFloat(e.target.price.value),
      currency: "USD",
      date: e.target.date.value,
      priority: e.target.priority.value,
      image_url: e.target.image_url.value,
      created_at: selectedSkill.created_at, // preserve original date
      created_by: selectedSkill.created_by, // preserve original creator
    };

    fetch(`http://localhost:3000/skills/${selectedSkill._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
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
            html: `Your <span class="font-bold text-blue-500">${formData.title}</span> course has been updated successfully.`,
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
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/skills/${skill._id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => res.json())
          .then(() => {
            setSkills((prev) => prev.filter((s) => s._id !== skill._id));

            Swal.fire({
              title: "Deleted!",
              html: `Your <span class="font-bold text-red-500">${skill.title}</span> course has been deleted.`,
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
      <h1 className="text-3xl font-bold text-blue-600 mb-6">My Courses</h1>

      {skills.length === 0 ? (
        <p className="text-gray-600">You haven't added any courses yet.</p>
      ) : (
        <div className="grid gap-5">
          {skills.map((skill) => (
            <div
              key={skill._id}
              className="flex flex-col md:flex-row justify-between items-start md:items-center border rounded-xl p-4 shadow bg-white"
            >
              {/* IMAGE */}
              <img
                src={skill.image_url}
                alt={skill.title}
                className="w-full md:w-40 h-32 object-cover rounded-md shadow mb-3 md:mb-0"
              />

              {/* DETAILS */}
              <div className="flex-1 md:ml-4">
                <h2 className="text-lg md:text-xl font-bold text-blue-600">
                  {skill.title}
                </h2>
                <p className="text-gray-700 text-sm mt-1">
                  <span className="font-semibold">Price:</span> {skill.price}{" "}
                  {skill.currency}
                </p>
                <p className="text-gray-700 text-sm mt-1">
                  <span className="font-semibold">Priority:</span>{" "}
                  <span
                    className={`px-2 py-1 rounded text-white text-xs ${
                      skill.priority === "High"
                        ? "bg-red-500"
                        : skill.priority === "Medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  >
                    {skill.priority}
                  </span>
                </p>
                <p className="text-gray-700 text-sm mt-1">
                  <span className="font-semibold">Date:</span> {skill.date}
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
                  Update
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

      {/* Update Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[420px]">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">
              Update Course
            </h2>

            <form onSubmit={handleUpdateSkill} className="space-y-5 bg-white">
              <div>
                <label className="block font-semibold text-blue-600 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  defaultValue={selectedSkill?.title}
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-blue-600 mb-1">
                  Short Description
                </label>
                <input
                  type="text"
                  name="short_description"
                  defaultValue={selectedSkill?.short_description}
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-blue-600 mb-1">
                  Full Description
                </label>
                <textarea
                  name="full_description"
                  defaultValue={selectedSkill?.full_description}
                  rows="4"
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-blue-600 mb-1">
                  Price (USD)
                </label>
                <input
                  type="number"
                  name="price"
                  defaultValue={selectedSkill?.price}
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-blue-600 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  defaultValue={selectedSkill?.date}
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-blue-600 mb-1">
                  Priority
                </label>
                <select
                  name="priority"
                  defaultValue={selectedSkill?.priority}
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                >
                  <option value="">Select Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-blue-600 mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  name="image_url"
                  defaultValue={selectedSkill?.image_url}
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
)
 }
export default ManageProduct;
