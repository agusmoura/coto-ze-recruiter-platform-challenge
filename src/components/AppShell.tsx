import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function AppShell() {
  return (
    <div className="min-h-dvh bg-neutral-50 text-neutral-900 flex flex-col">
      <Header />

      <main
        id="main"
        role="main"
        className="flex-1 mx-auto w-full max-w-6xl px-4 py-8 flex flex-col"
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
