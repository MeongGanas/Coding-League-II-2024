export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    image: string;
    deskripsi: string;
}

export interface Sektor {
    id: number;
    name: string;
    deskripsi: string;
    image: string;
}

export interface SektorsProps {
    current_page: number;
    data: Sektor[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: { url: string | null; label: string; active: boolean }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export interface Proyek {
    id: number;
    name: string;
    sektor_id: number;
    kecamatan: string;
    tgl_awal: string;
    tgl_akhir: string | null;
    deksripsi: string;
    image: string;
    status: string;
}

export interface ProyekProps {
    current_page: number;
    data: Proyek[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: { url: string | null; label: string; active: boolean }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export interface PaginationProps {
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: { url: string | null; label: string; active: boolean }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export interface Kecamatan {
    id: string;
    regency_id: string;
    name: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};
