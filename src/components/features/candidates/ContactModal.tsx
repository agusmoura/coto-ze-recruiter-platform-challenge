import { ActionButton } from "@/components/ui/ActionButton";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Select";
import { useContactedCandidates } from "@/hooks/useContactedCandidates";
import { getRolesList, sendMessage } from "@/services/api";
import type { Candidate } from "@/types/candidate";
import type { SendMessageError } from "@/types/message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

const contactSchema = z.object({
  role: z.string().min(1, "El rol es obligatorio"),
  msj: z
    .string()
    .min(1, "El mensaje es obligatorio")
    .min(10, "El mensaje debe tener al menos 10 caracteres"),
  email: z
    .string()
    .min(1, "El email es obligatorio")
    .email("Ingresá un email válido"),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: Candidate | null;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

export function ContactModal({
  isOpen,
  onClose,
  candidate,
  onSuccess,
  onError,
}: ContactModalProps) {
  const { markAsContacted } = useContactedCandidates();

  // Obtener lista de roles
  const { data: rolesData, isLoading: rolesLoading } = useQuery({
    queryKey: ["roles"],
    queryFn: getRolesList,
    staleTime: 1000 * 60 * 10, // 10 minutos
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: {
      role: "",
      msj: "",
      email: "",
    },
  });

  // Mutation para enviar mensaje
  const mutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: (data) => {
      onSuccess(
        `✅ Mensaje enviado exitosamente a @${candidate?.username}. Se enviará una copia a tu email.`,
      );
      reset();
      onClose();

      // Guardar en historial local
      const history = JSON.parse(
        localStorage.getItem("messageHistory") || "[]",
      );
      history.push({
        id: data.id,
        candidateUsername: candidate?.username,
        role: data.role,
        msj: data.msj,
        submittedAt: data.submitted_at,
      });
      localStorage.setItem("messageHistory", JSON.stringify(history));

      // Marcar candidato como contactado
      if (candidate?.username) {
        markAsContacted(candidate.username);
      }
    },
    onError: (error: unknown) => {
      // Type guard para SendMessageError
      const isMessageError = (err: unknown): err is SendMessageError => {
        return (
          typeof err === "object" &&
          err !== null &&
          "error" in err &&
          "message" in err
        );
      };

      if (isMessageError(error) && error.error === "invalid_role") {
        setError("role", {
          type: "manual",
          message: error.message,
        });
        onError(
          `❌ ${error.message}. Por favor, seleccioná un rol válido de la lista.`,
        );
      } else {
        const errorMessage = isMessageError(error)
          ? error.message
          : "Error desconocido";
        onError(`❌ Error al enviar el mensaje: ${errorMessage}`);
      }
    },
  });

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate(data);
  };

  const handleClose = () => {
    if (!mutation.isPending) {
      reset();
      onClose();
    }
  };

  const roleOptions =
    rolesData?.roles.map((role) => ({
      value: role,
      label: role,
    })) || [];

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={`Contactar a @${candidate?.username || "candidato"}`}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Info del candidato */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex flex-col gap-2 text-sm">
            <div>
              <span className="font-medium text-gray-700">Usuario:</span>{" "}
              <span className="text-gray-600">@{candidate?.username}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Puntuación:</span>{" "}
              <span className="text-gray-600">⭐ {candidate?.score}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Habilidades:</span>{" "}
              <div className="flex flex-wrap gap-1 mt-1">
                {candidate?.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700"
                  >
                    {skill.language} ({skill.level})
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <Select
          {...register("role")}
          label="Rol"
          placeholder="Seleccionar rol"
          options={roleOptions}
          error={errors.role?.message}
          disabled={mutation.isPending || rolesLoading}
        />

        <div className="flex flex-col gap-1">
          <label
            htmlFor="msj"
            className="text-sm sm:text-base font-medium text-[#292929]"
          >
            Mensaje
          </label>
          <textarea
            {...register("msj")}
            id="msj"
            rows={4}
            placeholder="Escribe tu mensaje aquí (mínimo 10 caracteres)"
            disabled={mutation.isPending}
            className={`
              w-full
              rounded-[10px]
              border
              bg-[#FAFAFA]
              px-3 py-2.5
              sm:py-3
              md:py-3.5
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
              resize-none
              ${
                errors.msj
                  ? "border-2 border-[#FF233D] focus:ring-[#FF233D]"
                  : "border border-[#292929]"
              }
            `}
            style={{
              fontFamily: "'Gotham Rounded', sans-serif",
              fontWeight: 325,
              lineHeight: "140%",
            }}
            aria-invalid={errors.msj ? "true" : "false"}
            aria-describedby={errors.msj ? "msj-error" : undefined}
          />
          {errors.msj && (
            <p
              id="msj-error"
              role="alert"
              className="text-[11px] sm:text-sm leading-[140%] text-[#FF233D]"
              style={{
                fontFamily: "'Gotham Rounded', sans-serif",
                fontWeight: 400,
              }}
            >
              {errors.msj.message}
            </p>
          )}
        </div>

        <Input
          {...register("email")}
          type="email"
          label="Tu email (para recibir una copia)"
          placeholder="tu@email.com"
          error={errors.email?.message}
          disabled={mutation.isPending}
        />

        {/* Botones */}
        <div className="flex gap-3 mt-2">
          <button
            type="button"
            onClick={handleClose}
            disabled={mutation.isPending}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Cancelar
          </button>
          <ActionButton
            type="submit"
            disabled={mutation.isPending}
            className="flex-1"
          >
            <span className="text-sm font-medium">
              {mutation.isPending ? "Enviando..." : "Enviar mensaje"}
            </span>
          </ActionButton>
        </div>
      </form>
    </Modal>
  );
}
