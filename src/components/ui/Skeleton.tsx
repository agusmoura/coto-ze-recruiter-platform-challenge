interface SkeletonProps {
  className?: string;
  variant?: "text" | "rectangular" | "circular";
}

export function Skeleton({
  className = "",
  variant = "rectangular",
}: SkeletonProps) {
  const baseClasses = "animate-pulse bg-gray-200";

  const variantClasses = {
    text: "h-4 rounded",
    rectangular: "rounded-lg",
    circular: "rounded-full",
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      aria-hidden="true"
    />
  );
}

export function FiltersSkeleton() {
  return (
    <div className="w-full bg-[#FFF0EB] rounded-xl p-6 mb-6 border border-[#FB6731]/20">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-6 w-20" variant="text" />
        <Skeleton className="h-9 w-9" variant="rectangular" />
      </div>

      {/* Filtros */}
      <div className="space-y-4">
        {/* Búsqueda libre - Input dimensions */}
        <div className="flex w-full flex-col gap-1">
          <Skeleton className="h-4 sm:h-5 w-32" variant="text" />
          <Skeleton
            className="w-full rounded-[10px] px-3 py-2.5 sm:py-3 md:py-3.5 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.25)]"
            variant="rectangular"
          />
        </div>

        {/* Nivel de habilidad - MultiSelect dimensions */}
        <div className="flex w-full flex-col gap-1">
          <Skeleton className="h-4 sm:h-5 w-40" variant="text" />
          <Skeleton
            className="w-full min-h-[44px] rounded-[10px] px-3 py-2 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.25)]"
            variant="rectangular"
          />
          <Skeleton className="h-3 sm:h-[14px] w-64" variant="text" />
        </div>

        {/* Habilidades - MultiSelect dimensions */}
        <div className="flex w-full flex-col gap-1">
          <Skeleton className="h-4 sm:h-5 w-24" variant="text" />
          <Skeleton
            className="w-full min-h-[44px] rounded-[10px] px-3 py-2 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.25)]"
            variant="rectangular"
          />
          <Skeleton className="h-3 sm:h-[14px] w-56" variant="text" />
        </div>
      </div>
    </div>
  );
}

export function CounterSkeleton() {
  return (
    <div className="w-full mb-4 text-sm">
      <Skeleton className="h-5 w-48" variant="text" />
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="w-full mb-6 overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-4 py-3 text-left">
              <Skeleton className="h-4 w-16" variant="text" />
            </th>
            <th className="px-4 py-3 text-left">
              <Skeleton className="h-4 w-32" variant="text" />
            </th>
            <th className="px-4 py-3 text-left">
              <Skeleton className="h-4 w-20" variant="text" />
            </th>
            <th className="px-4 py-3 text-left">
              <Skeleton className="h-4 w-24" variant="text" />
            </th>
            <th className="px-4 py-3 text-center">
              <Skeleton className="h-4 w-16 mx-auto" variant="text" />
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {Array.from({ length: 10 }).map((_, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="px-4 py-3">
                <Skeleton className="h-5 w-24" variant="text" />
              </td>
              <td className="px-4 py-3">
                <Skeleton className="h-5 w-20" variant="text" />
              </td>
              <td className="px-4 py-3">
                <Skeleton className="h-6 w-12" variant="rectangular" />
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-1">
                  <Skeleton className="h-6 w-16" variant="rectangular" />
                  <Skeleton className="h-6 w-20" variant="rectangular" />
                  <Skeleton className="h-6 w-14" variant="rectangular" />
                </div>
              </td>
              <td className="px-4 py-3 text-center">
                <Skeleton className="h-8 w-24 mx-auto" variant="rectangular" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PaginationSkeleton() {
  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Info de items */}
      <div className="text-sm">
        <Skeleton className="h-5 w-48" variant="text" />
      </div>

      {/* Controles de paginación */}
      <div className="flex items-center gap-4">
        {/* Selector de items por página */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-36" variant="text" />
          <Skeleton
            className="border border-gray-300 rounded-md px-2 py-1 w-14 h-[30px]"
            variant="rectangular"
          />
        </div>

        {/* Botones de navegación */}
        <div className="flex items-center gap-2">
          {/* Primera página */}
          <Skeleton
            className="px-2 py-1 w-7 h-[30px] border border-gray-300 rounded-md"
            variant="rectangular"
          />

          {/* Página anterior */}
          <Skeleton
            className="px-2 py-1 w-7 h-[30px] border border-gray-300 rounded-md"
            variant="rectangular"
          />

          {/* Indicador de página actual */}
          <Skeleton className="px-3 py-1 w-12 h-[30px]" variant="text" />

          {/* Página siguiente */}
          <Skeleton
            className="px-2 py-1 w-7 h-[30px] border border-gray-300 rounded-md"
            variant="rectangular"
          />

          {/* Última página */}
          <Skeleton
            className="px-2 py-1 w-7 h-[30px] border border-gray-300 rounded-md"
            variant="rectangular"
          />
        </div>
      </div>
    </div>
  );
}
