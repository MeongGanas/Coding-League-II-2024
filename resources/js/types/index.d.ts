export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    image: string;
    deskripsi: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};
