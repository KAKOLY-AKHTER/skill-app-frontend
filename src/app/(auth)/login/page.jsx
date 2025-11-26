"use client";

import { useContext, useState } from "react";
import { AuthContext } from "@/Context/AuthProvider";
import { useRouter, useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

const Login = () => {
  const { login, loginWithGoogle, user, loading, setLoading } =
    useContext(AuthContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get("from") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome back!`,
        timer: 1500,
        showConfirmButton: false,
      });
      router.replace(redirectTo);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome!`,
        timer: 1500,
        showConfirmButton: false,
      });
      router.replace(redirectTo);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="p-8 bg-white rounded shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="my-2 text-center text-sm text-gray-500">OR</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full mt-3 border py-2 rounded flex justify-center items-center gap-2"
        >
          <FcGoogle className="w-5 h-5" />
          Google Login
        </button>

        <p className="text-center text-sm mt-4">
          Don't have an account? Please{" "}
          <a href="/register" className="text-blue-600 underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
