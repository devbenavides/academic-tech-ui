import { useForm } from "react-hook-form";
import type { CreateStudentFormValues } from "../validation/type";
import { useEffect } from "react";
import { mapBackendErrors } from "../../../shared/utils/mapBackendErrors";
import { yupResolver } from "@hookform/resolvers/yup";
import { createStudentSchema } from "../validation";

interface Props {
  initialValues?: Partial<CreateStudentFormValues>;
  onSubmit: (data: CreateStudentFormValues) => void;
  backendErrors?: Record<string, string>;
}

export const StudentForm = ({
  initialValues,
  onSubmit,
  backendErrors,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset,
    watch,
  } = useForm<CreateStudentFormValues>({
    resolver: yupResolver(createStudentSchema),
    defaultValues: {
      student: {
        firstName: initialValues?.student?.firstName || "",
        middleName: initialValues?.student?.middleName || "",
        lastName: initialValues?.student?.lastName || "",
        secondLastName: initialValues?.student?.secondLastName || "",
        enrollmentNumber: initialValues?.student?.enrollmentNumber || "",
        dateOfBirth: initialValues?.student?.dateOfBirth || "",
      },
      user: {
        idUser: initialValues?.user?.idUser,
        username: initialValues?.user?.username || "",
        email: initialValues?.user?.email || "",
        password: "",
        confirmPassword: "",
        roles: initialValues?.user?.roles || ["STUDENT"],
      },
    },
  });

  const passwordValue = watch("user.password");

  useEffect(() => {
    if (initialValues) reset(initialValues);
  }, [initialValues, reset]);

  useEffect(() => {
    if (!backendErrors) return;
    clearErrors();

    Object.entries(backendErrors).forEach(([field, message]) => {
      const formField = mapBackendErrors(field);
      if (formField) {
        setError(formField as any, { type: "server", message });
      }
    });
  }, [backendErrors, setError, clearErrors]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container mt-4">
      <div className="card mb-4 shadow-sm">
        <div className="card-header text-black">
          <h5 className="mb-0">Datos del Estudiante</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                {...register("student.firstName")}
                placeholder="Primer Nombre"
                className={`form-control ${errors.student?.firstName ? "is-invalid" : ""}`}
              />
              {errors.student?.firstName && (
                <div className="invalid-feedback">
                  {errors.student.firstName.message}
                </div>
              )}
            </div>

            <div className="col-md-6 mb-3">
              <input
                {...register("student.middleName")}
                placeholder="Segundo Nombre"
                className="form-control"
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                {...register("student.lastName")}
                placeholder="Primer Apellido"
                className={`form-control ${errors.student?.lastName ? "is-invalid" : ""}`}
              />
              {errors.student?.lastName && (
                <div className="invalid-feedback">
                  {errors.student.lastName.message}
                </div>
              )}
            </div>

            <div className="col-md-6 mb-3">
              <input
                {...register("student.secondLastName")}
                placeholder="Segundo Apellido"
                className="form-control"
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                {...register("student.enrollmentNumber")}
                placeholder="Número de matricula"
                className={`form-control ${errors.student?.enrollmentNumber ? "is-invalid" : ""}`}
              />
              {errors.student?.enrollmentNumber && (
                <div className="invalid-feedback">
                  {errors.student.enrollmentNumber.message}
                </div>
              )}
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="date"
                {...register("student.dateOfBirth")}
                placeholder="Fecha de nacimiento"
                className={`form-control ${errors.student?.dateOfBirth ? "is-invalid" : ""}`}
              />
              {errors.student?.dateOfBirth && (
                <div className="invalid-feedback">
                  {errors.student.dateOfBirth.message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-header text-black">
          <h5 className="mb-0">Datos de Usuario</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                {...register("user.username")}
                placeholder="Username"
                className={`form-control ${errors.user?.username ? "is-invalid" : ""}`}
              />
              {errors.user?.username && (
                <div className="invalid-feedback">
                  {errors.user.username.message}
                </div>
              )}
            </div>

            <div className="col-md-6 mb-3">
              <input
                {...register("user.email")}
                placeholder="Email"
                className={`form-control ${errors.user?.email ? "is-invalid" : ""}`}
              />
              {errors.user?.email && (
                <div className="invalid-feedback">
                  {errors.user.email.message}
                </div>
              )}
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="password"
                {...register("user.password")}
                placeholder="Password"
                className={`form-control ${errors.user?.password ? "is-invalid" : ""}`}
              />
              {errors.user?.password && (
                <p className="invalid-feedback">
                  {errors.user.password.message}
                </p>
              )}
            </div>

            {(!initialValues?.user?.idUser || passwordValue) && (
              <div className="col-md-6 mb-3">
                <input
                  type="password"
                  {...register("user.confirmPassword")}
                  placeholder="Confirm Password"
                  className={`form-control ${errors.user?.confirmPassword ? "is-invalid" : ""}`}
                />
                {errors.user?.confirmPassword && (
                  <p className="invalid-feedback">
                    {errors.user.confirmPassword.message}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="text-end">
        <button type="submit" className="btn btn-success px-4">
          {initialValues?.user?.idUser
            ? "Actualizar Estudiante"
            : "Crear Estudiante"}
        </button>
      </div>
    </form>
  );
};
