import type { TeacherResponse } from "../types/teacherResponse";

type Props = {
  teachers: TeacherResponse[];
  onEdit:(teacher: TeacherResponse)=> void;
  onDelete:(teacher: TeacherResponse) => void;
};

export const TeacherTable = ({ teachers, onEdit, onDelete }: Props) => {
  if (teachers.length === 0) {
    return <p>No hay profesores registrados</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Especialidad</th>
          <th>Usuario</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {teachers.map((t) => (
          <tr key={t.idTeacher}>
            <td>
              {t.firstName} {t.lastName}
            </td>
            <td>{t.specialty}</td>
            <td>{t.user.username}</td>
            <td>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => onEdit(t)}
              >
                Editar
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(t)}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
