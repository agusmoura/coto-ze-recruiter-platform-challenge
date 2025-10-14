import { useAuth } from "@/auth/useAuth";
import { ActionButton } from "@/components/ActionButton";
import { Icon } from "@/components/Icon";
import { Input } from "@/components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "El correo electrónico es requerido")
    .email("Ingresá un correo electrónico válido"),
  password: z
    .string()
    .min(1, "La contraseña es requerida")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: LoginFormData) => {
    setAuthError(null);

    const success = await login({ email: data.email, pass: data.password });

    if (success) {
      navigate("/candidatos");
    } else {
      setAuthError(
        "Los datos ingresados no coinciden. Por favor, verificá que sean correctos.",
      );
    }
  };

  return (
    <section className="flex flex-col items-center justify-center flex-1 gap-y-11  mx-0 sm:mx-auto  sm:w-2xl">
      <Icon size={162} className="flex-shrink-0" />
      <div className="flex flex-col items-center justify-center gap-y-2">
        <h1 className="text-3xl  md:text-4xl font-medium">Iniciá sesión</h1>
        <p className="text-sm ">Con tu correo electrónico y contraseña</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm px-4">
        <div className="flex flex-col gap-y-4">
          <Input
            {...register("email")}
            type="email"
            placeholder="Ingresá tu correo"
            label="Correo electrónico"
            error={errors.email?.message}
            disabled={isSubmitting}
          />
          <Input
            {...register("password")}
            type="password"
            placeholder="Ingresá tu contraseña"
            label="Contraseña"
            error={errors.password?.message}
            disabled={isSubmitting}
          />
        </div>

        {authError && (
          <div className="mt-4 p-3 text-sm text-[#FF5F5F] " role="alert">
            {authError}
          </div>
        )}

        <ActionButton type="submit" disabled={isSubmitting} className="mt-8">
          <span className="text-base font-medium">
            {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
          </span>
        </ActionButton>
      </form>
    </section>
  );
}
