import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

function ProtectedRoute({ children }: { children: ReactNode }) {


  const isAuthenticated = localStorage.getItem("token");
  const log = "dkfnf";

  if (!log) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;