import { useAuth } from "@/auth/useAuth";
import { ActionButton } from "@/components/ActionButton";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "./Icon";

export function Header() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header
      role="banner"
      className={`bg-neutral-800 text-white sticky top-0 z-50 shadow-md border-b border-neutral-700 transition-all duration-300 ${
        isScrolled ? "py-1" : "py-0"
      }`}
    >
      <nav
        aria-label="Navegación principal"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            isScrolled ? "h-12" : "h-16"
          }`}
        >
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <Icon
              size={isScrolled ? 32 : 40}
              className="flex-shrink-0 transition-all duration-300"
            />
            <span
              className={`font-semibold transition-all duration-300 ${
                isScrolled ? "text-lg" : "text-xl"
              }`}
            >
              Recruiter Platform
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            {isAuthenticated && (
              <>
                <ActionButton
                  onClick={handleLogout}
                  size={isScrolled ? "small" : "medium"}
                >
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
