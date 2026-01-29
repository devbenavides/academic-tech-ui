export interface UserRequest {
    idUser?: number;
    username: string;
    email: string;
    password?: string;
    roles: string[];
}