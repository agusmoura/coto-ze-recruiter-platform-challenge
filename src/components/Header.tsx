import { useAuth } from "@/auth/useAuth";
import { ActionButton } from "@/components/ActionButton";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "./Icon";

export function Header() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header
      role="banner"
      className="bg-neutral-800 text-white sticky top-0 z-50 shadow-md border-b border-neutral-700"
    >
      <nav
        aria-label="Navegación principal"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <Icon size={40} className="flex-shrink-0" />
            <span className="text-xl font-semibold">Recruiter Platform</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            {isAuthenticated && (
              <>
                <ActionButton onClick={handleLogout}>
                  <span className="text-sm font-medium">Cerrar sesión</span>
                </ActionButton>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
