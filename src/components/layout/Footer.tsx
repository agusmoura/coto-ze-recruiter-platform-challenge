export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="bg-neutral-800 text-white mt-auto border-t border-neutral-700"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-center">
          <p className="text-sm text-neutral-500">
            © {currentYear} Recruiter Platform.
          </p>
        </div>
      </div>
    </footer>
  );
}
