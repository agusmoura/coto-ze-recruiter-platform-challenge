import { ProtectedRoute } from "@/app/protectedRoute";
import { RootRedirect } from "@/app/RootRedirect";
import { AppShell } from "@/components/AppShell";
import { Candidates } from "@/pages/Candidates";
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
        element: <RootRedirect />,
      },
      {
        path: "/candidatos",
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
