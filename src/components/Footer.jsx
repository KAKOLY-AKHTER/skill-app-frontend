import React from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div>
            <h1 className="text-2xl font-bold mb-2 text-blue-500">
              <a href="/" className="flex items-center gap-1">
                <img className="w-6 h-6" src="/logo.png" alt="" />
                <span>Skills Dev Platform</span>
              </a>
            </h1>
            <p className="text-gray-400">
              A modern platform providing awesome courses for your learning
              journey.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-blue-500 transition">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/all-course"
                  className="hover:text-blue-500 transition"
                >
                  All Courses
                </Link>
              </li>
              <li>
                <Link href="/#" className="hover:text-blue-500 transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#" className="hover:text-blue-500 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="font-semibold mb-4">Contact</h2>
            <p className="text-gray-400">Kakoly Akhter</p>
            <p className="text-gray-400">Dhaka, Bangladesh</p>
            <p className="text-gray-400">Email:kakolyakhter48@gmail.com</p>
            <p className="text-gray-400">Phone: +880 1317938087</p>
          </div>

          {/* Social */}
          <div>
            <h2 className="font-semibold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/kakoly.akhter.80142"
                className="hover:text-white"
              >
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-white">
                <FaTwitter />
              </a>
              <a href="https://www.instagram.com/akhter_kakoly?igsh=MW5tb3UzYXJ4amZhNQ%3D%3D" className="hover:text-white">
                <FaInstagram />
              </a>
              <a
                href="https://www.linkedin.com/in/kakoly-akhter-27044a392/"
                className="hover:text-white"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-8 py-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Skills Dev Platform. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
