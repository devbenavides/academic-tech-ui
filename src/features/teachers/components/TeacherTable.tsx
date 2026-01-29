import type { TeacherResponse } from "../types/teacherResponse";

type Props = {
  teachers: TeacherResponse[];
  onRefresh: () => void;
};

export const TeacherTable = ({ teachers }: Props) => {
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
        </tr>
      </thead>
      <tbody>
        {teachers.map((t) => (
          <tr key={t.idTeacher}>
            <td>{t.firstName} {t.lastName}</td>
            <td>{t.specialty}</td>
            <td>{t.user.username}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
