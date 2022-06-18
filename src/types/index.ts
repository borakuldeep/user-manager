export interface User {
    id: number;
    name: string;
    groups: number[];
}

export interface Group {
    id: number;
    name: string;
    users: number[];
}