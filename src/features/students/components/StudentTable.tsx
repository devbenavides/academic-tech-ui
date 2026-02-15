import type { StudentResponse } from "../types/studentResponse";

type Props = {
  students: StudentResponse[];
  onEdit: (student: StudentResponse) => void;
  onDelete: (student: StudentResponse) => void;
};

export const StudentTable = ({students,onEdit,onDelete}:Props)=>{
    if(students.length === 0){
        return <p>No hay estudiantes registrados</p>
    }
    return(
        <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Fecha de Nacimiento</th>
          <th>Usuario</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {students.map((t) => (
          <tr key={t.idStudent}>
            <td>
              {t.firstName} {t.lastName}
            </td>
            <td>{t.dateOfBirth}</td>
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
