import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { isAuthenticated } from "../services/auth";

function LoginProtecRouter({ children }: { children: ReactNode }) {

  if (isAuthenticated()) {
    return <Navigate to="/" />;
  }

  return children;
}

export default LoginProtecRouter;