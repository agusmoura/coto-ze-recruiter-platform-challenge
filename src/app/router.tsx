import { ProtectedRoute } from "@/app/protectedRoute";
import { RootRedirect } from "@/app/RootRedirect";
import { AppShell } from "@/components/layout/AppShell";
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

// Lazy load de páginas pesadas
const Candidates = lazy(() => import("@/pages/Candidates"));
const Login = lazy(() => import("@/pages/Login"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const withSuspense = (Component: React.ComponentType) => (
  <Suspense
    fallback={
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    }
  >
    <Component />
  </Suspense>
);

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
        element: <ProtectedRoute>{withSuspense(Candidates)}</ProtectedRoute>,
      },
      {
        path: "/login",
        element: withSuspense(Login),
      },
      {
        path: "*",
        element: withSuspense(NotFound),
      },
    ],
  },
]);
