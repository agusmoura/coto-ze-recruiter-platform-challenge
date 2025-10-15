import { motion } from "framer-motion";
import { Search } from "lucide-react";

interface ActiveFiltersChipsProps {
  searchTerm: string;
  levelFilters: string[];
  skillFilters: string[];
  getLevelLabel: (value: string) => string;
  getSkillLabel: (value: string) => string;
}

export function ActiveFiltersChips({
  searchTerm,
  levelFilters,
  skillFilters,
  getLevelLabel,
  getSkillLabel,
}: ActiveFiltersChipsProps) {
  return (
    <div className="flex flex-wrap gap-2 items-center w-full min-w-0">
      <span className="text-sm text-gray-600 shrink-0">Filtros activos:</span>

      {searchTerm && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-[#FB6731] text-[#FB6731] rounded-md text-sm max-w-full"
        >
          <Search className="w-4 h-4 shrink-0" />
          <span className="font-medium shrink-0">Búsqueda:</span>
          <span className="truncate">"{searchTerm}"</span>
        </motion.span>
      )}

      {levelFilters.map((level, index) => (
        <motion.span
          key={`level-${level}-${index}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 + index * 0.05 }}
          className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-[#FB6731] text-[#FB6731] rounded-md text-sm max-w-full"
        >
          <span className="font-medium shrink-0">Nivel:</span>
          <span className="truncate">{getLevelLabel(level)}</span>
        </motion.span>
      ))}

      {skillFilters.map((skill, index) => (
        <motion.span
          key={`skill-${skill}-${index}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.1 + (levelFilters.length + index) * 0.05,
          }}
          className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-[#FB6731] text-[#FB6731] rounded-md text-sm max-w-full"
        >
          <span className="font-medium shrink-0">Skill:</span>
          <span className="truncate">{getSkillLabel(skill)}</span>
        </motion.span>
      ))}
    </div>
  );
}
