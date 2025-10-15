import { Check, ChevronDown, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface MultiSelectOption {
  value: string;
  label: string;
}

interface MultiSelectProps {
  label?: string;
  placeholder?: string;
  options: MultiSelectOption[];
  value: string[];
  onChange: (selected: string[]) => void;
  error?: string;
  helperText?: string;
}

/**
 * MultiSelect component con pills, dropdown y soporte para selección múltiple.
 * Implementa las mejores prácticas de UX/UI y accesibilidad.
 *
 * @example
 * ```tsx
 * <MultiSelect
 *   label="Habilidades"
 *   options={[
 *     { value: 'js', label: 'JavaScript' },
 *     { value: 'ts', label: 'TypeScript' }
 *   ]}
 *   value={selectedSkills}
 *   onChange={setSelectedSkills}
 *   placeholder="Seleccionar habilidades..."
 * />
 * ```
 */
export function MultiSelect({
  label,
  placeholder = "Seleccionar opciones...",
  options,
  value,
  onChange,
  error,
  helperText,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Manejar teclas de escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (searchTerm) {
          // Si hay término de búsqueda, limpiarlo primero
          setSearchTerm("");
        } else {
          // Si no hay término, cerrar el dropdown
          setIsOpen(false);
        }
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, searchTerm]);

  const handleToggle = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);

    if (!newIsOpen) {
      setSearchTerm("");
    } else {
      // Focus en el input de búsqueda cuando se abre
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  };

  const handleSelect = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const handleRemove = (optionValue: string, event: React.MouseEvent) => {
    event.stopPropagation();
    onChange(value.filter((v) => v !== optionValue));
  };

  const getLabel = (optionValue: string) => {
    return (
      options.find((opt) => opt.value === optionValue)?.label || optionValue
    );
  };

  const selectId = `multiselect-${label?.replace(/\s/g, "-").toLowerCase()}`;
  const errorId = `${selectId}-error`;
  const helperId = `${selectId}-helper`;

  // Filtrar opciones basado en el término de búsqueda
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex w-full flex-col gap-1" ref={containerRef}>
      {label && (
        <label
          htmlFor={selectId}
          className="text-sm sm:text-base font-medium text-[#292929]"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {/* Input clickeable con pills */}
        <div
          ref={inputRef}
          id={selectId}
          onClick={handleToggle}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={`
            w-full
            min-h-[44px]
            rounded-[10px]
            border
            bg-[#FAFAFA]
            px-3 py-2
            text-xs
            sm:text-sm
            md:text-base
            text-[#838383]
            shadow-[0px_2px_8px_0px_rgba(0,0,0,0.25)]
            transition-all
            duration-200
            cursor-pointer
            focus:outline-none
            focus:ring-2
            focus:ring-[#292929]
            focus:ring-offset-0
            ${
              error
                ? "border-2 border-[#FF233D] focus:ring-[#FF233D]"
                : "border border-[#292929]"
            }
          `}
          style={{
            fontFamily: "'Gotham Rounded', sans-serif",
            fontWeight: 325,
            lineHeight: "140%",
          }}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleToggle();
            }
          }}
        >
          <div className="flex flex-wrap gap-1.5 items-center">
            {value.length === 0 ? (
              <span className="text-[#838383]">{placeholder}</span>
            ) : (
              value.map((selectedValue, idx) => (
                <span
                  key={`selected-${selectedValue}-${idx}`}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-[#FB6731] text-white rounded-md text-xs font-medium"
                  style={{
                    fontFamily: "'Gotham Rounded', sans-serif",
                  }}
                >
                  {getLabel(selectedValue)}
                  <button
                    onClick={(e) => handleRemove(selectedValue, e)}
                    className="inline-flex items-center justify-center min-w-[20px] min-h-[20px] w-5 h-5 rounded-full hover:bg-white/20 transition-colors active:scale-90"
                    aria-label={`Eliminar ${getLabel(selectedValue)}`}
                    type="button"
                  >
                    <X className="w-3 h-3" strokeWidth={2} />
                  </button>
                </span>
              ))
            )}
          </div>
        </div>

        {/* Dropdown arrow icon */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <ChevronDown
            className={`h-5 w-5 text-[#838383] transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </div>

        {/* Dropdown de opciones */}
        {isOpen && (
          <div
            className="absolute z-50 w-full mt-1 bg-white border border-[#292929] rounded-[10px] shadow-lg max-h-[60vh] overflow-hidden"
            role="listbox"
            aria-label={label}
          >
            {/* Input de búsqueda dentro del dropdown */}
            <div className="sticky top-0 bg-white p-3 border-b border-gray-200 rounded-t-[10px] z-10">
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar..."
                  className="w-full pl-9 pr-9 py-2 min-h-[44px] text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FB6731] focus:border-transparent"
                  onClick={(e) => e.stopPropagation()}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                {searchTerm && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSearchTerm("");
                      searchInputRef.current?.focus();
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Limpiar búsqueda"
                  >
                    <X className="w-4 h-4" strokeWidth={2} />
                  </button>
                )}
              </div>
            </div>

            {/* Lista de opciones filtradas */}
            <div className="max-h-60 overflow-auto">
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-3 min-h-[44px] flex items-center text-sm text-[#838383]">
                  {searchTerm
                    ? "No se encontraron resultados"
                    : "No hay opciones disponibles"}
                </div>
              ) : (
                filteredOptions.map((option, idx) => {
                  const isSelected = value.includes(option.value);
                  return (
                    <div
                      key={`option-${option.value || idx}`}
                      onClick={() => handleSelect(option.value)}
                      role="option"
                      aria-selected={isSelected}
                      className={`
                      px-3 py-3
                      min-h-[44px]
                      cursor-pointer
                      transition-colors
                      flex items-center gap-2
                      text-xs sm:text-sm
                      active:scale-[0.98]
                      ${
                        isSelected
                          ? "bg-[#FFF0EB] text-[#FB6731]"
                          : "hover:bg-gray-50 text-[#292929]"
                      }
                    `}
                      style={{
                        fontFamily: "'Gotham Rounded', sans-serif",
                        fontWeight: 325,
                      }}
                    >
                      {/* Checkbox visual */}
                      <div
                        className={`
                        w-4 h-4 rounded border flex items-center justify-center
                        ${
                          isSelected
                            ? "bg-[#FB6731] border-[#FB6731]"
                            : "border-[#292929] bg-white"
                        }
                      `}
                      >
                        {isSelected && (
                          <Check
                            className="w-3 h-3 text-white"
                            strokeWidth={3}
                          />
                        )}
                      </div>
                      <span>{option.label}</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-[11px] sm:text-sm leading-[140%] text-[#FF233D]"
          style={{
            fontWeight: 400,
          }}
        >
          {error}
        </p>
      )}

      {helperText && !error && (
        <p
          id={helperId}
          className="text-[11px] sm:text-sm text-[#838383]"
          style={{
            fontWeight: 400,
          }}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}
