"use client";

import { AuthContext } from "@/Context/AuthProvider";
import PrivateRoute from "@/Context/PrivateRoute";
import { FiUser } from "@react-icons/all-files/fi/FiUser";
import React, { useContext } from "react";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <PrivateRoute>
      <div className="p-8 max-w-md mx-auto bg-white shadow-lg rounded-xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-500">
          My Profile
        </h1>

        <div className="flex flex-col items-center gap-4">
          {/* User Photo or Default Icon */}
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="User Photo"
              className="w-32 h-32 rounded-full shadow-md object-cover"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center shadow-md">
              <FiUser className="text-gray-400 w-16 h-16" />
            </div>
          )}

          {/* User Info */}
          <div className="w-full text-center space-y-2">
            <p className="text-lg">
              <strong>Name:</strong> {user?.displayName || "Not Available"}
            </p>
            <p className="text-lg">
              <strong>Email:</strong> {user?.email || "Not Available"}
            </p>
            <p className="text-lg">
              <strong>Email Verified:</strong>{" "}
              {user?.emailVerified ? "Yes" : "No"}
            </p>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default Profile;
