import type { SortDirection, SortableColumn } from "@/hooks/useTable";
import type { Candidate } from "@/types/candidate";
import {
  Archive,
  ArrowUpDown,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Code,
  Mail,
} from "lucide-react";

interface TableProps {
  data: Candidate[];
  sortColumn: SortableColumn | null;
  sortDirection: SortDirection;
  onSort: (column: SortableColumn) => void;
  onContact: (candidate: Candidate) => void;
  contactedCandidates: Set<string>;
}

export function Table({
  data,
  sortColumn,
  sortDirection,
  onSort,
  onContact,
  contactedCandidates,
}: TableProps) {
  const getSortIcon = (column: SortableColumn) => {
    if (sortColumn !== column) {
      return <ArrowUpDown className="w-3 h-3 text-gray-400" />;
    }

    return sortDirection === "asc" ? (
      <ChevronUp className="w-3 h-3" />
    ) : (
      <ChevronDown className="w-3 h-3" />
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Advanced":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-blue-100 text-blue-800";
      case "Beginner":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-3">
        {/* Mobile Sort Controls */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <button
            onClick={() => onSort("username")}
            className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
              sortColumn === "username"
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
            }`}
          >
            Usuario
            {getSortIcon("username")}
          </button>
          <button
            onClick={() => onSort("joined_at")}
            className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
              sortColumn === "joined_at"
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
            }`}
          >
            Fecha
            {getSortIcon("joined_at")}
          </button>
          <button
            onClick={() => onSort("score")}
            className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
              sortColumn === "score"
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
            }`}
          >
            Puntuación
            {getSortIcon("score")}
          </button>
        </div>

        {/* Mobile Cards */}
        {data.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
            <div className="flex flex-col items-center gap-2">
              <Archive className="w-12 h-12 text-gray-300" />
              <p className="text-gray-500 text-sm">
                No se encontraron candidatos
              </p>
            </div>
          </div>
        ) : (
          data.map((candidate, idx) => (
            <article
              key={`${candidate.username}-${idx}`}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-4 active:shadow-lg active:scale-[0.99] transition-all duration-200 hover:shadow-md"
            >
              {/* Header: Username + Score */}
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-gray-100">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-gray-900 truncate">
                      {candidate.username}
                    </h3>
                    {contactedCandidates.has(candidate.username) && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                        <CheckCircle2 className="w-3 h-3" />
                        Contactado
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                    <span>
                      <Calendar className="w-3 h-3" />
                    </span>
                    <time dateTime={candidate.joined_at}>
                      {formatDate(candidate.joined_at)}
                    </time>
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-purple-100 to-purple-50 border-2 border-purple-200">
                    <div className="text-center">
                      <div className="text-base font-bold text-purple-800">
                        {candidate.score}
                      </div>
                      <div className="text-[9px] text-purple-600 font-medium -mt-0.5">
                        pts
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1">
                    <Code className="w-3 h-3" />
                    Habilidades
                  </span>
                  <span className="text-xs text-gray-600">
                    ({candidate.skills.length})
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill, skillIdx) => (
                    <span
                      key={skillIdx}
                      className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm ${getLevelColor(skill.level)} border border-black/5`}
                      title={`${skill.language} - ${skill.level}`}
                    >
                      {skill.language}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              {contactedCandidates.has(candidate.username) ? (
                <button
                  disabled
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3.5 min-h-[52px] text-base font-semibold text-gray-500 bg-gray-200 rounded-xl cursor-not-allowed shadow-sm"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Ya contactado
                </button>
              ) : (
                <button
                  onClick={() => onContact(candidate)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3.5 min-h-[52px] text-base font-semibold text-white bg-[#FB6731] hover:bg-[#ff7542] active:bg-[#e85a2a] rounded-xl transition-all shadow-md hover:shadow-lg active:shadow-sm active:scale-[0.98]"
                >
                  <Mail className="w-5 h-5" />
                  Contactar
                </button>
              )}
            </article>
          ))
        )}
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden md:block w-full max-w-full overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200 -webkit-overflow-scrolling-touch scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <table className="border-collapse min-w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="sticky left-0 z-10 bg-gray-50 px-4 py-3 text-left shadow-[2px_0_4px_-2px_rgba(0,0,0,0.1)]">
                <button
                  onClick={() => onSort("username")}
                  className="group flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors w-full"
                >
                  Usuario
                  <span className="text-xs cursor-pointer hover:bg-gray-200 rounded-full p-1">
                    {getSortIcon("username")}
                  </span>
                </button>
              </th>
              <th className="px-4 py-3 text-left min-w-[100px]">
                <button
                  onClick={() => onSort("joined_at")}
                  className="group flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors "
                >
                  Fecha de ingreso
                  <span className="text-xs cursor-pointer hover:bg-gray-200 rounded-full p-1">
                    {getSortIcon("joined_at")}
                  </span>
                </button>
              </th>
              <th className="px-4 py-3 text-left min-w-[120px]">
                <button
                  onClick={() => onSort("score")}
                  className="group flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors "
                >
                  Puntuación
                  <span className="text-xs cursor-pointer hover:bg-gray-200 rounded-full p-1">
                    {getSortIcon("score")}
                  </span>
                </button>
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-[250px]">
                Habilidades
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 min-w-[120px]">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Archive className="w-12 h-12 text-gray-300" />
                    <p className="text-gray-500 text-sm">
                      No se encontraron candidatos
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((candidate, idx) => (
                <tr
                  key={`${candidate.username}-${idx}`}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="sticky left-0 z-10 bg-white px-4 py-3 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.1)] group-hover:bg-gray-50">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-gray-900">
                        {candidate.username}
                      </span>
                      {contactedCandidates.has(candidate.username) && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200 w-fit">
                          <CheckCircle2 className="w-3 h-3" />
                          Contactado
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    <time
                      dateTime={candidate.joined_at}
                      title={new Date(candidate.joined_at).toLocaleDateString(
                        "es-AR",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        },
                      )}
                    >
                      {formatDate(candidate.joined_at)}
                    </time>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800">
                      ⭐ {candidate.score}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1 max-w-full">
                      {candidate.skills.map((skill, skillIdx) => (
                        <span
                          key={skillIdx}
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getLevelColor(skill.level)}`}
                          title={skill.level}
                        >
                          {skill.language}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {contactedCandidates.has(candidate.username) ? (
                      <button
                        disabled
                        className="inline-flex items-center gap-1 px-3 py-2 min-h-[44px] text-sm font-medium text-gray-500 bg-gray-200 rounded-md cursor-not-allowed shadow-sm"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Ya contactado
                      </button>
                    ) : (
                      <button
                        onClick={() => onContact(candidate)}
                        className="inline-flex items-center gap-1 px-3 py-2 min-h-[44px] text-sm font-medium text-white bg-[#FB6731] hover:bg-[#ff7542] rounded-md transition-colors shadow-sm active:scale-95"
                      >
                        <Mail className="w-4 h-4" />
                        Contactar
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
