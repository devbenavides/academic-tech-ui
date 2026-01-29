export const mapBackendErrors = (field: string): string | null => {
  const fieldMap: Record<string, string> = {
    // USER
    username: 'user.username',
    email: 'user.email',
    password: 'user.password',

    // TEACHER
    firstName: 'teacher.firstName',
    middleName: 'teacher.middleName',
    lastName: 'teacher.lastName',
    secondLastName: 'teacher.secondLastName',
    specialty: 'teacher.specialty',
  };

  return fieldMap[field] ?? null;
};
