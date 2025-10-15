import { Input } from "@/components/ui/Input";
import { MultiSelect } from "@/components/ui/MultiSelect";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  levelFilters: string[];
  onLevelFiltersChange: (levels: string[]) => void;
  skillFilters: string[];
  onSkillFiltersChange: (skills: string[]) => void;
  levelOptions: FilterOption[];
  skillOptions: FilterOption[];
  onClearFilters: () => void;
  activeFiltersCount: number;
}

export function FilterDrawer({
  isOpen,
  onClose,
  searchTerm,
  onSearchChange,
  levelFilters,
  onLevelFiltersChange,
  skillFilters,
  onSkillFiltersChange,
  levelOptions,
  skillOptions,
  onClearFilters,
  activeFiltersCount,
}: FilterDrawerProps) {
  const dragControls = useDragControls();
  const constraintsRef = useRef(null);

  // Bloquear scroll del body cuando el drawer está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Cerrar con tecla ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            ref={constraintsRef}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
            }}
            drag="y"
            dragControls={dragControls}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 150 || info.velocity.y > 300) {
                onClose();
              }
            }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[85vh] flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="filter-drawer-title"
          >
            {/* Handle para arrastrar */}
            <div
              className="flex justify-center py-3 cursor-grab active:cursor-grabbing"
              onPointerDown={(e) => dragControls.start(e)}
            >
              <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <h2
                  id="filter-drawer-title"
                  className="text-xl font-bold text-gray-900"
                >
                  Filtros
                </h2>
                <AnimatePresence mode="wait">
                  {activeFiltersCount > 0 && (
                    <motion.span
                      key={activeFiltersCount}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 25,
                      }}
                      className="inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-[#FB6731] rounded-full leading-none"
                    >
                      {activeFiltersCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Cerrar filtros"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content - scrollable */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="space-y-4 pb-4">
                {/* Búsqueda de texto libre */}
                <Input
                  type="text"
                  placeholder="Buscar por usuario o tecnología..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  label="Búsqueda libre"
                />

                {/* Filtro de nivel */}
                <MultiSelect
                  label="Nivel de habilidad"
                  placeholder="Seleccionar niveles..."
                  options={levelOptions}
                  value={levelFilters}
                  onChange={onLevelFiltersChange}
                  helperText="El candidato debe tener todas las habilidades con los niveles seleccionados"
                />

                {/* Filtro de habilidades */}
                <MultiSelect
                  label="Habilidades"
                  placeholder="Seleccionar habilidades..."
                  options={skillOptions}
                  value={skillFilters}
                  onChange={onSkillFiltersChange}
                  helperText="El candidato debe tener todas las habilidades seleccionadas"
                />
              </div>
            </div>

            {/* Footer con botones */}
            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 rounded-b-3xl">
              <div className="flex gap-3">
                {activeFiltersCount > 0 && (
                  <button
                    onClick={onClearFilters}
                    className="flex-1 min-h-[48px] px-4 py-3 text-sm font-medium text-[#FB6731] bg-white border-2 border-[#FB6731] rounded-lg hover:bg-[#FFF0EB] transition-colors active:scale-95 flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Limpiar
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="flex-1 min-h-[48px] px-4 py-3 text-sm font-medium text-white bg-[#FB6731] rounded-lg hover:bg-[#ff7542] transition-colors active:scale-95 shadow-lg"
                >
                  Aplicar filtros
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
