export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
};

export type UserWithoutId = Omit<User, 'id'>
export type userId = User['id']