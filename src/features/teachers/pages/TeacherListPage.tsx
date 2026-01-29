import { TeacherTable } from "../components/TeacherTable";
import { useTeachers } from "../hooks/useTeacher";

export const TeacherListPage = () =>{
    const {teachers, loading, error, fetchTeachers}=useTeachers();
    if(loading) return <p>Cargando...</p>
    if(error) return <p>Error: {error.message}</p>

    return(
        <div>
            <h1>Profesores</h1>
            <TeacherTable teachers={teachers} onRefresh={fetchTeachers}/>
        </div>
    );
};