import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createTeacherSchema } from "../validation/create-teacher.schema";
import type { CreateTeacherFormValues } from "../validation/types";
import { useEffect } from "react";
import { mapBackendErrors } from "../../../shared/utils/mapBackendErrors";

interface Props {
  onSubmit: (data: CreateTeacherFormValues) => void;
  backendErrors?: Record<string, string>;
}

export const TeacherForm = ({ onSubmit, backendErrors }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<CreateTeacherFormValues>({
    resolver: yupResolver(createTeacherSchema),
    defaultValues: {
      teacher: {
        firstName: '',
        middleName: '',
        lastName: '',
        secondLastName: '',
        specialty: '',
      },
      user: {
        username: '',
        email: '',
        password: '',
        roles: ['TEACHER'],
      },
    },
  });

  useEffect(() => {
    if (!backendErrors) return;

    // Limpiamos errores previos
    clearErrors();

    Object.entries(backendErrors).forEach(([field, message]) => {
      const formField = mapBackendErrors(field);
      if (formField) {
        setError(formField as any, { type: 'server', message });
      }
    });
  }, [backendErrors, setError, clearErrors]);

  const inputClass = (fieldError?: string) =>
    `border p-2 rounded ${fieldError ? 'border-red-500' : 'border-gray-300'}`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h3>Datos del Profesor</h3>

      <div>
        <input {...register('teacher.firstName')} placeholder="Nombre" className={inputClass(errors.teacher?.firstName?.message)} />
        {errors.teacher?.firstName && <p className="error-message">{errors.teacher.firstName.message}</p>}
      </div>

      <div>
        <input {...register('teacher.lastName')} placeholder="Apellido" className={inputClass(errors.teacher?.lastName?.message)} />
        {errors.teacher?.lastName && <p className="error-message">{errors.teacher.lastName.message}</p>}
      </div>

      <div>
        <input {...register('teacher.specialty')} placeholder="Especialidad" className={inputClass(errors.teacher?.specialty?.message)} />
        {errors.teacher?.specialty && <p className="error-message">{errors.teacher.specialty.message}</p>}
      </div>

      <h3>Datos de Usuario</h3>

      <div>
        <input {...register('user.username')} placeholder="Username" className={inputClass(errors.user?.username?.message)} />
        {errors.user?.username && <p className="error-message">{errors.user.username.message}</p>}
      </div>

      <div>
        <input {...register('user.email')} placeholder="Email" className={inputClass(errors.user?.email?.message)} />
        {errors.user?.email && <p className="error-message">{errors.user.email.message}</p>}
      </div>

      <div>
        <input type="password" {...register('user.password')} placeholder="Password" className={inputClass(errors.user?.password?.message)} />
        {errors.user?.password && <p className="error-message">{errors.user.password.message}</p>}
      </div>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Crear Profesor
      </button>
    </form>
  );
};