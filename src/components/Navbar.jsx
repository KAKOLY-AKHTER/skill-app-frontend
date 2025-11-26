"use client";

import { useState, useContext } from "react";
import { FiMenu } from "@react-icons/all-files/fi/FiMenu";
import { FiX } from "@react-icons/all-files/fi/FiX";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthContext } from "@/Context/AuthProvider";
import { FiUser } from "@react-icons/all-files/fi/FiUser";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { user, logOut } = useContext(AuthContext);

  const links = [
    { href: "/", label: "Home" },
    { href: "/all-skills", label: "All Skills" },
    user ? { href: "/add-skill", label: "Add Skill" } : null,
    user ? { href: "/manage-skills", label: "Manage Skills" } : null,
  ].filter(Boolean);

  return (
    <div className="w-full sticky bg-white/70 shadow-md backdrop-blur-md top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex justify-between items-center relative">
        <div className="flex items-center gap-2">
          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FiX className="text-red-500" size={24} /> : <FiMenu className="text-blue-500" size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="absolute top-14 left-0 w-64 md:hidden flex flex-col items-start gap-4 p-4 bg-white/30 backdrop-blur-xl border rounded-lg shadow-lg z-50">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`font-semibold px-2 py-1 rounded transition ${
                      isActive
                        ? "text-blue-500"
                        : "text-gray-800 hover:text-blue-500"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          )}

          <div className="text-xl font-bold text-blue-500">
            <Link className="flex items-center gap-1" href="/">
              <img className="w-6 h-6" src="/logo.png" alt="" />
              <span>Skills Dev Platform</span>
            </Link>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-semibold transition ${
                  isActive
                    ? "text-blue-500 font-bold"
                    : "text-gray-800 hover:text-blue-500"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Login / Profile */}
        <div className="flex items-center gap-4">
          {!user ? (
            <Link
              href="/login"
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700"
            >
              Login
            </Link>
          ) : (
            <div className="relative inline-block">
              {/* Profile Image */}
              <button
                onClick={() => setOpen(!open)}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer bg-gray-100"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "Profile"}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <FiUser className="w-6 h-6 text-gray-600" />
                )}
              </button>

              {/* Dropdown Menu */}
              {open && (
                <div className="absolute flex flex-col gap-2 right-0 mt-2 w-40 bg-white border rounded shadow-lg p-2 z-50">
                  <Link
                    href="/profile"
                    onClick={() => setOpen(false)}
                    className={`block px-4 py-2 rounded-lg transition ${
                      pathname === "/profile"
                        ? "bg-blue-500 text-white"
                        : "text-gray-800 hover:bg-blue-700 hover:text-white border-2 hover:border-none"
                    }`}
                  >
                    Profile
                  </Link>

                  <button
                    onClick={() => {
                      logOut();
                      setOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-red-700 bg-red-500 rounded-lg text-white"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
