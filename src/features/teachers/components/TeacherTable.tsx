import type { TeacherResponse } from "../types/teacherResponse";

type Props = {
  teachers: TeacherResponse[];
  onEdit:(teacher: TeacherResponse)=> void;
};

export const TeacherTable = ({ teachers, onEdit }: Props) => {
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
                className="bg-yellow-400 text-white px-2 py-1 rounded"
                onClick={() => onEdit(t)}
              >
                Editar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
