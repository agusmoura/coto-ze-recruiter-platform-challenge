import { ActionButton } from "@/components/ui/ActionButton";
import { FileQuestion } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center justify-center flex-1 gap-y-8 px-4">
      <div className="flex flex-col items-center gap-6 max-w-md text-center">
        <FileQuestion className="w-24 h-24 text-gray-400" strokeWidth={1.5} />

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Página no encontrada
          </h1>
          <p className="text-gray-600 text-lg">
            La página que estás buscando no existe o fue movida.
          </p>
        </div>

        <ActionButton onClick={() => navigate("/candidatos")} className="mt-4">
          <span className="text-base font-medium">Volver a candidatos</span>
        </ActionButton>
      </div>
    </section>
  );
}
