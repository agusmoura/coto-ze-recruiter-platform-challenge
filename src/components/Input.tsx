import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

/**
 * Input component con manejo de errores y estilos personalizados.
 *
 * @example
 * ```tsx
 * // Con react-hook-form
 * <Input
 *   {...register('email')}
 *   label="Email"
 *   placeholder="tu@email.com"
 *   error={errors.email?.message}
 * />
 *
 * // Standalone
 * <Input
 *   value={value}
 *   onChange={(e) => setValue(e.target.value)}
 *   error="Este campo es requerido"
 * />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = "", id, ...props }, ref) => {
    const inputId = id || `input-${label?.replace(/\s/g, "-").toLowerCase()}`;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className="flex w-full flex-col gap-1">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm sm:text-base font-medium text-[#292929]"
          >
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
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
            placeholder:text-[#838383]
            focus:outline-none
            focus:ring-2
            focus:ring-[#292929]
            focus:ring-offset-0
            disabled:cursor-not-allowed
            disabled:opacity-50
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
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          {...props}
        />

        {error && (
          <p
            id={errorId}
            role="alert"
            className="text-[11px] sm:text-sm leading-[140%] text-[#FF233D]"
            style={{
              fontFamily: "'Gotham Rounded', sans-serif",
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
              fontFamily: "'Gotham Rounded', sans-serif",
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

Input.displayName = "Input";
