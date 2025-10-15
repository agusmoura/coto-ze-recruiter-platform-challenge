import { ChevronDown } from "lucide-react";
import { forwardRef, type SelectHTMLAttributes } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
}

/**
 * Select component con manejo de errores y estilos personalizados.
 *
 * @example
 * ```tsx
 * // Con react-hook-form
 * <Select
 *   {...register('role')}
 *   label="Rol"
 *   options={[
 *     { value: 'frontend', label: 'Frontend' },
 *     { value: 'backend', label: 'Backend' }
 *   ]}
 *   error={errors.role?.message}
 * />
 * ```
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      className = "",
      id,
      options,
      placeholder = "Seleccionar...",
      ...props
    },
    ref,
  ) => {
    const selectId = id || `select-${label?.replace(/\s/g, "-").toLowerCase()}`;
    const errorId = `${selectId}-error`;
    const helperId = `${selectId}-helper`;

    return (
      <div className="flex w-full flex-col gap-1">
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm sm:text-base font-medium text-[#292929]"
          >
            {label}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={`
              w-full
              rounded-[10px]
              border
              bg-[#FAFAFA]
              px-3 py-2.5
              sm:py-3
              md:py-3.5
              text-start
              text-xs
              sm:text-sm
              md:text-base
              text-[#838383]
              shadow-[0px_2px_8px_0px_rgba(0,0,0,0.25)]
              transition-all
              duration-200
              focus:outline-none
              focus:ring-2
              focus:ring-[#292929]
              focus:ring-offset-0
              disabled:cursor-not-allowed
              disabled:opacity-50
              appearance-none
              cursor-pointer
              ${
                error
                  ? "border-2 border-[#FF233D] focus:ring-[#FF233D]"
                  : "border border-[#292929]"
              }
              ${className}
            `}
            style={{
              fontFamily: "'Gotham Rounded', sans-serif",
              fontWeight: 325,
              lineHeight: "140%",
            }}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            {...props}
          >
            {placeholder && (
              <option key="__placeholder__" value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option, idx) => (
              <option
                key={option.value || `option-${idx}`}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>

          {/* Dropdown arrow icon */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ChevronDown
              className="h-5 w-5 text-[#838383]"
              aria-hidden="true"
            />
          </div>
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
  },
);

Select.displayName = "Select";
