import { Link } from "react-router-dom";
import { Icon } from "./Icon";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="bg-neutral-800 text-white mt-auto border-t border-neutral-700"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <Icon size={32} className="flex-shrink-0" />
              <span className="font-semibold text-lg">Recruiter Platform</span>
            </Link>
            <p className="text-sm text-neutral-400 text-center md:text-left">
              Plataforma de gestión de candidatos para procesos de
              reclutamiento.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-neutral-700">
          <p className="text-sm text-neutral-500 text-center">
            © {currentYear} Recruiter Platform.
          </p>
        </div>
      </div>
    </footer>
  );
}
