import LogoSVG from "@/assets/icon.svg?react";
import { forwardRef } from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

/**
 * Componente reutilizable para el logo/icono de la aplicación
 *
 * @example
 * ```tsx
 * <Icon size={32} className="text-orange-500" />
 * ```
 */
export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ size = 24, className = "", ...props }, ref) => {
    return (
      <LogoSVG
        ref={ref}
        width={size}
        height={size}
        className={className}
        aria-hidden="true"
        {...props}
      />
    );
  },
);

Icon.displayName = "Icon";
