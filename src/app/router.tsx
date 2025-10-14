import { ProtectedRoute } from "@/app/protectedRoute";
import { AppShell } from "@/components/AppShell";
import { Candidates } from "@/pages/Candidates";
import { Home } from "@/pages/Home";
import { Login } from "@/pages/Login";
import { NotFound } from "@/pages/NotFound";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/candidates",
        element: (
          <ProtectedRoute>
            <Candidates />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
