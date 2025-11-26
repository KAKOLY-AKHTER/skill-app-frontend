"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation"; // Next.js routing
import { AuthContext } from "./AuthProvider";
import Loader from "@/components/Loader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login"); 
    }
  }, [user, loading, router]);

  if (loading) return <Loader />; 

  if (user) {
    return <>{children}</>; 
  }

  return null; 
};

export default PrivateRoute;
