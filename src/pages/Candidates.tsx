import { CandidatesFiltersPanel } from "@/components/features/candidates/CandidatesFiltersPanel";
import { ContactModal } from "@/components/features/candidates/ContactModal";
import { FilterDrawer } from "@/components/features/candidates/FilterDrawer";
import { MobileFilterButton } from "@/components/features/candidates/MobileFilterButton";
import { ResultsCounter } from "@/components/features/candidates/ResultsCounter";
import { Pagination } from "@/components/ui/Pagination";
import {
  CounterSkeleton,
  FiltersSkeleton,
  PaginationSkeleton,
  TableSkeleton,
} from "@/components/ui/Skeleton";
import { Table } from "@/components/ui/Table";
import { Toast, type ToastType } from "@/components/ui/Toast";
import { useContactedCandidates } from "@/hooks/useContactedCandidates";
import { useTable } from "@/hooks/useTable";
import { getUserList } from "@/services/api";
import type { Candidate } from "@/types/candidate";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react";
import { useMemo, useState } from "react";

export default function Candidates() {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(true);
  const [isMobileFilterDrawerOpen, setIsMobileFilterDrawerOpen] =
    useState(false);

  // Hook para manejar candidatos contactados
  const { contactedCandidates, isContacted } = useContactedCandidates();

  // Toast state
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
    isVisible: boolean;
  }>({
    message: "",
    type: "info",
    isVisible: false,
  });

  // Obtener lista de candidatos
  const {
    data: candidatesData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["candidates"],
    queryFn: getUserList,
  });

  // Hook de tabla con filtrado, ordenamiento y paginación
  const tableState = useTable({
    data: candidatesData || [],
    initialPageSize: 10,
  });

  const handleContact = (candidate: Candidate) => {
    // Prevenir abrir modal si ya está contactado
    if (isContacted(candidate.username)) {
      showToast(
        `ℹ️ Ya contactaste a @${candidate.username} anteriormente`,
        "info",
      );
      return;
    }

    setSelectedCandidate(candidate);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCandidate(null);
  };

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  };

  // Extraer opciones dinámicamente de los datos
  const levelOptions = useMemo(() => {
    if (!candidatesData) return [];
    const uniqueLevels = new Set(
      candidatesData.flatMap((candidate) =>
        candidate.skills.map((skill) => skill.level),
      ),
    );
    return Array.from(uniqueLevels)
      .sort()
      .map((level) => ({
        value: level,
        label: level,
      }));
  }, [candidatesData]);

  const skillOptions = useMemo(() => {
    if (!candidatesData) return [];
    const uniqueSkills = new Set(
      candidatesData.flatMap((candidate) =>
        candidate.skills.map((skill) => skill.language),
      ),
    );
    return Array.from(uniqueSkills)
      .sort()
      .map((skill) => ({
        value: skill,
        label: skill,
      }));
  }, [candidatesData]);

  // Contar filtros activos
  const activeFiltersCount =
    (tableState.searchTerm ? 1 : 0) +
    tableState.levelFilters.length +
    tableState.skillFilters.length;

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        {/* Header - SIEMPRE VISIBLE */}
        <div className="mb-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Candidatos
          </h1>
          <p className="text-gray-600">
            Explorá nuestra base de candidatos y contactalos directamente
          </p>
        </div>

        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="hidden md:block">
            <FiltersSkeleton />
          </div>
          <CounterSkeleton />
          <TableSkeleton />
          <PaginationSkeleton />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4 max-w-md text-center">
          <AlertCircle className="w-16 h-16 text-red-500" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Error al cargar candidatos
            </h2>
            <p className="text-gray-600">
              {error instanceof Error
                ? error.message
                : "Ocurrió un error desconocido"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Header */}
      <div className="mb-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Candidatos
        </h1>
        <p className="text-gray-600">
          Explorá nuestra base de candidatos y contactalos directamente
        </p>
      </div>

      {/* Contenedor principal para evitar layout shift */}
      <div className="w-full max-w-[100dvw] max-w-[90%] px-4 sm:px-6 lg:px-8">
        {/* Filtros - Solo visible en desktop (md y superior) */}
        <CandidatesFiltersPanel
          isExpanded={isFiltersExpanded}
          onToggleExpanded={() => setIsFiltersExpanded(!isFiltersExpanded)}
          searchTerm={tableState.searchTerm}
          onSearchChange={tableState.setSearchTerm}
          levelFilters={tableState.levelFilters}
          onLevelFiltersChange={tableState.setLevelFilters}
          skillFilters={tableState.skillFilters}
          onSkillFiltersChange={tableState.setSkillFilters}
          levelOptions={levelOptions}
          skillOptions={skillOptions}
          onClearFilters={tableState.clearFilters}
          activeFiltersCount={activeFiltersCount}
        />

        {/* Contador de resultados */}
        <div className="w-full mb-4 text-sm text-gray-600">
          <ResultsCounter totalItems={tableState.totalItems} />
        </div>

        {/* Tabla */}
        <div className="w-full mb-6">
          <Table
            data={tableState.data}
            sortColumn={tableState.sortColumn}
            sortDirection={tableState.sortDirection}
            onSort={tableState.handleSort}
            onContact={handleContact}
            contactedCandidates={contactedCandidates}
          />
        </div>

        {/* Paginación */}
        {tableState.totalItems > 0 && (
          <div className="w-full">
            <Pagination
              currentPage={tableState.currentPage}
              totalPages={tableState.totalPages}
              pageSize={tableState.pageSize}
              totalItems={tableState.totalItems}
              onPageChange={tableState.goToPage}
              onPageSizeChange={tableState.changePageSize}
              onNext={tableState.nextPage}
              onPrevious={tableState.previousPage}
              hasNext={tableState.hasNextPage}
              hasPrevious={tableState.hasPreviousPage}
            />
          </div>
        )}
      </div>

      {/* Modal de contacto */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        candidate={selectedCandidate}
        onSuccess={(message) => showToast(message, "success")}
        onError={(message) => showToast(message, "error")}
      />

      {/* Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />

      {/* Botón flotante de filtros - Solo móvil */}
      <MobileFilterButton
        onClick={() => setIsMobileFilterDrawerOpen(true)}
        activeFiltersCount={activeFiltersCount}
      />

      {/* Drawer de filtros para móvil */}
      <FilterDrawer
        isOpen={isMobileFilterDrawerOpen}
        onClose={() => setIsMobileFilterDrawerOpen(false)}
        searchTerm={tableState.searchTerm}
        onSearchChange={tableState.setSearchTerm}
        levelFilters={tableState.levelFilters}
        onLevelFiltersChange={tableState.setLevelFilters}
        skillFilters={tableState.skillFilters}
        onSkillFiltersChange={tableState.setSkillFilters}
        levelOptions={levelOptions}
        skillOptions={skillOptions}
        onClearFilters={tableState.clearFilters}
        activeFiltersCount={activeFiltersCount}
      />
    </div>
  );
}
