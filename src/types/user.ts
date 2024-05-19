export interface User {
    id?: number;
    username: string;
    password: string;
    created_at?: string;
    updated_at?: string;
}

export interface Contract {
    id: number;
    user_id: number;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
}