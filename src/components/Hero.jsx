"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { AuthContext } from "@/Context/AuthProvider";

const Hero = () => {
  const { user } = useContext(AuthContext);

  return (
    <section className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white overflow-hidden w-full rounded-2xl">
      {/* Decorative shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-400 opacity-20 rounded-full filter blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-400 opacity-20 rounded-full filter blur-3xl animate-pulse"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center min-h-[80vh]">
        {/* Left: Text Content */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
            Learn. Grow. Achieve.
          </h1>
          <p className="text-lg sm:text-xl text-gray-100 max-w-md mx-auto md:mx-0">
            Unlock your potential with expert-led courses and hands-on projects.
            Join thousands of learners and level up your skills.
          </p>

          {/* Buttons or Welcome Message */}
          <div className="flex gap-4 justify-center md:justify-start flex-wrap mt-4 pb-4">
            {user ? (
              <h2 className="text-2xl font-semibold">
                Welcome, {user.displayName}!
              </h2>
            ) : (
              <>
                <Link href="/all-skills">
                  <button className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition">
                    Explore Skills
                  </button>
                </Link>
                <Link href="/register">
                  <button className="border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-indigo-600 transition">
                    Get Started
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Right: Animated SVG Illustration */}
        <div className="flex-1 mb-10 md:mb-0 flex justify-center md:justify-end">
          <svg
            className="w-64 h-64 md:w-80 md:h-80"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="gradCourse"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>

            {/* Laptop */}
            <rect
              x="50"
              y="90"
              width="100"
              height="50"
              rx="5"
              fill="url(#gradCourse)"
              className="animate-float-slow"
            />
            <rect
              x="55"
              y="95"
              width="90"
              height="30"
              rx="2"
              fill="#fff"
              opacity="0.7"
            />

            {/* Book */}
            <rect
              x="30"
              y="40"
              width="40"
              height="60"
              rx="5"
              fill="#FBBF24"
              className="animate-bounce-slow"
            />
            <line
              x1="35"
              y1="50"
              x2="65"
              y2="50"
              stroke="#fff"
              strokeWidth="2"
              opacity="0.8"
            />
            <line
              x1="35"
              y1="60"
              x2="65"
              y2="60"
              stroke="#fff"
              strokeWidth="2"
              opacity="0.6"
            />

            {/* Certificate */}
            <rect
              x="130"
              y="40"
              width="40"
              height="30"
              rx="3"
              fill="#10B981"
              className="animate-bounce-slower"
            />
            <line
              x1="135"
              y1="50"
              x2="165"
              y2="50"
              stroke="#fff"
              strokeWidth="2"
            />
            <line
              x1="135"
              y1="55"
              x2="165"
              y2="55"
              stroke="#fff"
              strokeWidth="2"
            />

            {/* Floating Learning Icons */}
            <circle
              cx="20"
              cy="20"
              r="8"
              fill="#fff"
              opacity="0.6"
              className="animate-bounce-slow"
            />
            <circle
              cx="180"
              cy="180"
              r="10"
              fill="#fff"
              opacity="0.5"
              className="animate-bounce-slower"
            />
            <circle
              cx="160"
              cy="60"
              r="6"
              fill="#fff"
              opacity="0.7"
              className="animate-bounce-slow"
            />
            <circle
              cx="40"
              cy="160"
              r="5"
              fill="#fff"
              opacity="0.6"
              className="animate-bounce-slower"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
