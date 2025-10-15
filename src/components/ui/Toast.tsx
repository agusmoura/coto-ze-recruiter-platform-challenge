import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, X, XCircle } from "lucide-react";
import { useEffect } from "react";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type: ToastType;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

/**
 * Toast component para mostrar notificaciones temporales.
 *
 * @example
 * ```tsx
 * <Toast
 *   message="Mensaje enviado exitosamente"
 *   type="success"
 *   isVisible={showToast}
 *   onClose={() => setShowToast(false)}
 * />
 * ```
 */
export function Toast({
  message,
  type,
  isVisible,
  onClose,
  duration = 5000,
}: ToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const getToastStyles = () => {
    switch (type) {
      case "success":
        return {
          bg: "bg-green-50",
          border: "border-green-500",
          text: "text-green-800",
          icon: <CheckCircle2 className="w-5 h-5" aria-hidden="true" />,
        };
      case "error":
        return {
          bg: "bg-red-50",
          border: "border-red-500",
          text: "text-red-800",
          icon: <XCircle className="w-5 h-5" aria-hidden="true" />,
        };
      case "info":
      default:
        return {
          bg: "bg-blue-50",
          border: "border-blue-500",
          text: "text-blue-800",
          icon: <Info className="w-5 h-5" aria-hidden="true" />,
        };
    }
  };

  const styles = getToastStyles();

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed top-4 right-4 z-[100] max-w-md">
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
            className={`
              flex items-start gap-3 p-4 rounded-lg border-l-4 shadow-lg
              ${styles.bg} ${styles.border} ${styles.text}
            `}
            role="alert"
          >
            <div className="flex-shrink-0 mt-0.5">{styles.icon}</div>

            <div className="flex-1 text-sm font-medium">{message}</div>

            <button
              onClick={onClose}
              className={`flex-shrink-0 ml-2 ${styles.text} hover:opacity-70 transition-opacity`}
              aria-label="Cerrar notificación"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
