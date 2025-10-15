interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

export function Pagination({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
}: PaginationProps) {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="w-full flex flex-col items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Info de items - siempre visible arriba */}
      <div className="text-xs sm:text-sm text-gray-700 text-center">
        Mostrando{" "}
        <span className="font-medium">
          {startItem}-{endItem}
        </span>{" "}
        de <span className="font-medium">{totalItems}</span>
      </div>

      {/* Controles de paginación */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto">
        {/* Botones de navegación */}
        <div className="flex items-center gap-1 order-2 sm:order-1">
          {/* Primera página */}
          <button
            onClick={() => onPageChange(1)}
            disabled={!hasPrevious}
            className="min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] px-2 sm:px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors active:scale-95"
            aria-label="Primera página"
          >
            «
          </button>

          {/* Página anterior */}
          <button
            onClick={onPrevious}
            disabled={!hasPrevious}
            className="min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] px-2 sm:px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors active:scale-95"
            aria-label="Página anterior"
          >
            ‹
          </button>

          {/* Indicador de página actual */}
          <span className="px-2 sm:px-4 py-2 min-h-[40px] sm:min-h-[44px] flex items-center text-sm text-gray-700 bg-gray-50 rounded-md">
            <span className="font-medium">{currentPage}</span>
            <span className="text-gray-500 mx-1">/</span>
            <span className="font-medium">{totalPages || 1}</span>
          </span>

          {/* Página siguiente */}
          <button
            onClick={onNext}
            disabled={!hasNext}
            className="min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] px-2 sm:px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors active:scale-95"
            aria-label="Página siguiente"
          >
            ›
          </button>

          {/* Última página */}
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={!hasNext}
            className="min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] px-2 sm:px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors active:scale-95"
            aria-label="Última página"
          >
            »
          </button>
        </div>

        {/* Selector de items por página */}
        <div className="flex items-center gap-1.5 sm:gap-2 order-1 sm:order-2">
          <label
            htmlFor="page-size"
            className="text-xs text-gray-600 whitespace-nowrap"
          >
            Por página:
          </label>
          <select
            id="page-size"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="min-h-[40px] sm:min-h-[44px] border border-gray-300 rounded-md px-2 sm:px-3 py-1.5 sm:py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FB6731] focus:border-transparent bg-white"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
        </div>
      </div>
    </div>
  );
}
