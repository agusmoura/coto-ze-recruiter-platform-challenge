import { AnimatePresence, motion } from "framer-motion";
import { Filter } from "lucide-react";

interface MobileFilterButtonProps {
  onClick: () => void;
  activeFiltersCount: number;
}

export function MobileFilterButton({
  onClick,
  activeFiltersCount,
}: MobileFilterButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="md:hidden fixed bottom-6 right-6 z-30 min-w-[56px] min-h-[56px] bg-[#FB6731] text-white rounded-full shadow-lg hover:bg-[#ff7542] active:scale-95 transition-colors flex items-center justify-center gap-2 px-4"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Abrir filtros"
    >
      <Filter className="w-6 h-6" />
      {activeFiltersCount > 0 && (
        <AnimatePresence mode="wait">
          <motion.span
            key={activeFiltersCount}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -top-1 -right-1 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-[#FB6731] bg-white rounded-full border-2 border-[#FB6731]"
          >
            {activeFiltersCount}
          </motion.span>
        </AnimatePresence>
      )}
    </motion.button>
  );
}
