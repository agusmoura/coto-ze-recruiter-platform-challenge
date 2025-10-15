import type { Candidate } from "@/types/candidate";
import { useMemo, useState } from "react";

export type SortDirection = "asc" | "desc" | null;
export type SortableColumn = "username" | "joined_at" | "score";

interface UseTableOptions {
  data: Candidate[];
  initialPageSize?: number;
}

export function useTable({ data, initialPageSize = 10 }: UseTableOptions) {
  // Estados de filtrado
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilters, setLevelFilters] = useState<string[]>([]);
  const [skillFilters, setSkillFilters] = useState<string[]>([]);

  // Estados de ordenamiento
  const [sortColumn, setSortColumn] = useState<SortableColumn | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  // Estados de paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // Filtrado
  const filteredData = useMemo(() => {
    return data.filter((candidate) => {
      // Filtro de búsqueda de texto libre (username + skills)
      const matchesSearch =
        searchTerm === "" ||
        candidate.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.skills.some((skill) =>
          skill.language.toLowerCase().includes(searchTerm.toLowerCase()),
        );

      // Filtro de nivel (level) - lógica AND: debe tener TODOS los niveles seleccionados
      const matchesLevel =
        levelFilters.length === 0 ||
        levelFilters.every((selectedLevel) =>
          candidate.skills.some(
            (skill) =>
              skill.level.toLowerCase() === selectedLevel.toLowerCase(),
          ),
        );

      // Filtro de habilidades - lógica AND: debe tener TODAS las habilidades seleccionadas
      const matchesSkills =
        skillFilters.length === 0 ||
        skillFilters.every((selectedSkill) =>
          candidate.skills.some(
            (skill) =>
              skill.language.toLowerCase() === selectedSkill.toLowerCase(),
          ),
        );

      return matchesSearch && matchesLevel && matchesSkills;
    });
  }, [data, searchTerm, levelFilters, skillFilters]);

  // Ordenamiento
  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDirection) {
      return filteredData;
    }

    const sorted = [...filteredData].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      if (sortColumn === "joined_at") {
        aValue = new Date(a.joined_at).getTime();
        bValue = new Date(b.joined_at).getTime();
      } else if (sortColumn === "score") {
        aValue = a.score;
        bValue = b.score;
      } else if (sortColumn === "username") {
        aValue = a.username.toLowerCase();
        bValue = b.username.toLowerCase();
      } else {
        aValue = 0;
        bValue = 0;
      }

      if (aValue < bValue) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });

    return sorted;
  }, [filteredData, sortColumn, sortDirection]);

  // Paginación
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, pageSize]);

  // Funciones helper
  const handleSort = (column: SortableColumn) => {
    if (sortColumn === column) {
      // Si ya estamos ordenando por esta columna, cambiar dirección
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        // Si ya está en desc, quitar ordenamiento
        setSortColumn(null);
        setSortDirection(null);
      }
    } else {
      // Nueva columna, empezar con asc
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const goToPage = (page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const changePageSize = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset a la primera página
  };

  const clearFilters = () => {
    setSearchTerm("");
    setLevelFilters([]);
    setSkillFilters([]);
    setSortColumn(null);
    setSortDirection(null);
    setCurrentPage(1);
  };

  // Resetear a página 1 cuando cambien los filtros
  const updateSearchTerm = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const updateLevelFilters = (levels: string[]) => {
    setLevelFilters(levels);
    setCurrentPage(1);
  };

  const updateSkillFilters = (skills: string[]) => {
    setSkillFilters(skills);
    setCurrentPage(1);
  };

  return {
    // Datos
    data: paginatedData,
    totalItems: sortedData.length,
    totalPages,

    // Filtros
    searchTerm,
    levelFilters,
    skillFilters,
    setSearchTerm: updateSearchTerm,
    setLevelFilters: updateLevelFilters,
    setSkillFilters: updateSkillFilters,
    clearFilters,

    // Ordenamiento
    sortColumn,
    sortDirection,
    handleSort,

    // Paginación
    currentPage,
    pageSize,
    goToPage,
    nextPage,
    previousPage,
    changePageSize,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };
}
