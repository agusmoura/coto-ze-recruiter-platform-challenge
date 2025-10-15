import { ActionButton } from "@/components/ui/ActionButton";
import { Icon } from "@/components/ui/Icon";
import { useNavigate } from "react-router-dom";
export function Home() {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col items-center justify-center flex-1 gap-y-11  mx-0 sm:mx-auto">
      <Icon size={162} className="flex-shrink-0" />
      <h1 className="text-3xl  md:text-4xl font-medium">Bienvenido</h1>
      <ActionButton onClick={() => navigate("/login")}>
        <span className="text-base font-medium">Iniciar sesión</span>
      </ActionButton>
    </section>
  );
}
