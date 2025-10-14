import { useAuth } from "@/auth/useAuth";
import { Home } from "@/pages/Home";
import { Navigate } from "react-router-dom";

export function RootRedirect() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/candidatos" replace /> : <Home />;
}
