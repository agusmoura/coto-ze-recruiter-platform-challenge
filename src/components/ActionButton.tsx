import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface ActionButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
}

/**
 * Componente de botón de acción responsive con animación spring y estados visuales.
 *
 * Incluye:
 * - Responsive: se adapta al ancho del contenedor
 * - Color principal: #FB6731
 * - Animación spring al hacer click (scale 0.97)
 * - Estados hover, active y disabled
 * - Sombra elevada
 *
 * @example
 * ```tsx
 * // Uso básico (ocupa todo el ancho)
 * <ActionButton onClick={() => console.log('clicked')}>
 *   Iniciar sesión
 * </ActionButton>
 *
 * // Con ancho personalizado
 * <ActionButton onClick={handleSubmit} className="w-80">
 *   <Icon name="arrow-right" />
 *   Continuar
 * </ActionButton>
 *
 * // Deshabilitado
 * <ActionButton disabled>
 *   Procesando...
 * </ActionButton>
 *
 * // Como submit de formulario
 * <ActionButton type="submit" ariaLabel="Enviar formulario">
 *   Enviar
 * </ActionButton>
 * ```
 */
export function ActionButton({
  children,
  onClick,
  disabled = false,
  className = "",
  type = "button",
  ariaLabel,
}: ActionButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`
        flex items-center justify-center gap-2.5
        w-full rounded-[10px]
        bg-[#FB6731] px-6 py-3
        text-white font-medium
        shadow-[0px_4px_8px_0px_rgba(0,0,0,0.35)]
        transition-all duration-200
        hover:bg-[#ff7542] hover:shadow-[0px_6px_12px_0px_rgba(0,0,0,0.4)]
        active:bg-[#e55620]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#FB6731]
        ${className}
      `}
      whileTap={
        disabled
          ? {}
          : {
              scale: 0.97,
              transition: {
                type: "spring",
                mass: 1,
                stiffness: 100,
                damping: 15,
              },
            }
      }
    >
      {children}
    </motion.button>
  );
}
