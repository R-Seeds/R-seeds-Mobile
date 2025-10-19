export enum UserType {
    GRADUATE = 'GRADUATE',
    SPONSOR = 'SPONSOR',
    USER = 'USER'
}

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserType;
    country: string|null;
    createdAt: string;
    updatedAt: string;
}

export interface Graduate {
    id: string;
    user: User
    finishYear: number
}

export interface Sponsor {
    id: string;
    user: User
    organization: string
}