import { Input } from "@/components/ui/Input";
import { MultiSelect } from "@/components/ui/MultiSelect";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import { ActiveFiltersChips } from "./ActiveFiltersChips";

interface FilterOption {
  value: string;
  label: string;
}

interface CandidatesFiltersPanelProps {
  isExpanded: boolean;
  onToggleExpanded: () => void;
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

export function CandidatesFiltersPanel({
  isExpanded,
  onToggleExpanded,
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
}: CandidatesFiltersPanelProps) {
  // Helper para obtener label de una opción
  const getLevelLabel = (value: string) =>
    levelOptions.find((opt) => opt.value === value)?.label || value;
  const getSkillLabel = (value: string) =>
    skillOptions.find((opt) => opt.value === value)?.label || value;

  return (
    <div className="hidden md:block w-full bg-[#FFF0EB] rounded-xl p-6 mb-6 border border-[#FB6731]/20">
      {/* Header con botón de colapsar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
          <AnimatePresence mode="wait">
            {activeFiltersCount > 0 && (
              <motion.span
                key={activeFiltersCount}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                className="inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-[#FB6731] rounded-full leading-none"
              >
                {activeFiltersCount}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <motion.button
          onClick={onToggleExpanded}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 text-[#FB6731] hover:bg-[#FB6731]/10 rounded-lg transition-colors"
          aria-label={isExpanded ? "Ocultar filtros" : "Mostrar filtros"}
        >
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.button>
      </div>

      {/* Resumen de filtros activos cuando está colapsado */}
      <AnimatePresence>
        {!isExpanded && activeFiltersCount > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ActiveFiltersChips
              searchTerm={searchTerm}
              levelFilters={levelFilters}
              skillFilters={skillFilters}
              getLevelLabel={getLevelLabel}
              getSkillLabel={getSkillLabel}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panel de filtros expandido */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="space-y-4 mt-4"
          >
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col gap-4 w-full"
            >
              {/* Búsqueda de texto libre - 100% ancho */}
              <Input
                type="text"
                placeholder="Buscar por usuario o tecnología..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                label="Búsqueda libre"
              />

              {/* Filtros de nivel y habilidades en una fila en desktop */}
              <div className="flex flex-col md:flex-row gap-4 w-full">
                {/* Filtro de nivel - MultiSelect */}
                <div className="flex-1 min-w-0">
                  <MultiSelect
                    label="Nivel de habilidad"
                    placeholder="Seleccionar niveles..."
                    options={levelOptions}
                    value={levelFilters}
                    onChange={onLevelFiltersChange}
                    helperText="El candidato debe tener todas las habilidades con los niveles seleccionados"
                  />
                </div>

                {/* Filtro de habilidades - MultiSelect */}
                <div className="flex-1 min-w-0">
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
            </motion.div>
          </motion.div>
        )}
        {/* Botón limpiar filtros */}
        {activeFiltersCount > 0 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            onClick={onClearFilters}
            className="text-sm text-[#FB6731] hover:text-[#ff7542] font-medium transition-colors flex items-center gap-1 mt-4"
          >
            <X className="w-4 h-4" />
            Limpiar filtros
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
