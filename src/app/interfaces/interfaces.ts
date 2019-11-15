export interface User {
    userName: string;
    email: string;
    password: string;
    name?: string;
    lastName?: string;
    img?: string;
}

export interface Todo {
    id?: string;
    todo?: string;
    done?: boolean;
}