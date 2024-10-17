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
    proyeks?: Proyek[];
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
    deskripsi: string;
    image: string;
    status: string;
    sektor: Sektor;
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

export interface Mitra {
    id: number;
    name: string | null;
    perusahaan: string;
    email: string;
    no_telepon: string | null;
    tgl_aktif: string | null;
    alamat: string | null;
    deskripsi: string | null;
    image: string | null;
}

export interface MitrasProps {
    current_page: number;
    data: Mitra[];
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

export interface Laporan {
    id: number;
    name: string;
    mitra: Mitra;
    lokasi: string;
    realisasi_date: string;
    tgl_kirim: string;
    status: string;
    realisasi: number;
}

export interface LaporanProps {
    current_page: number;
    data: Laporan[];
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

export interface Kegiatan {
    id: number;
    name: string;
    rincian: number;
    kecamatan: string;
    tgl_terbit: string;
    deskripsi: string;
    image: string;
    status: string;
    tags: string[];
}

export interface KegiatanProps {
    current_page: number;
    data: Kegiatan[];
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

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};
