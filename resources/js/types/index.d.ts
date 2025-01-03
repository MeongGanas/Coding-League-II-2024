export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    image: string;
    deskripsi: string;
    mitra: Mitra;
}

export interface Sektor {
    id: number;
    name: string;
    deskripsi: string;
    image: string;
    proyeks?: Proyek[];
    laporans: Laporan[];
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

export interface ServerMessage {
    message: string;
    severity: "error" | "success";
}

export interface Proyek {
    id: number;
    name: string;
    sektor_id: number;
    sektor: Sektor;
    kecamatan: string;
    tgl_awal: string;
    tgl_akhir: string | null;
    tgl_terbit: string | null;
    deskripsi: string;
    image: string;
    status: string;
    sektor: Sektor;
    partisipasi: Partisipasi[];
}

export interface Partisipasi {
    id: number;
    mitra: Mitra;
    created_at: string;
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
    status: "Aktif" | "Non-Aktif" | "Pengajuan";
    password: string;
    laporan?: Laporan[];
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
    sektor_id: number;
    proyek_id: number;
    mitra_id: number;
    name: string;
    mitra: Mitra;
    lokasi: string;
    realisasi_date: string;
    created_at: string;
    status: string;
    realisasi: number;
    photos: string[];
    rincian: string;
    created_at: string;
    sektor: Sektor;
    pesan: string;
    proyek: Proyek;
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
    status: "Terbit" | "Draf";
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

export interface Counts {
    countProyek: number;
    countProyekRealized: number;
    countMitra: number;
    countTotalDanaRealized: string;
}

export interface DataCSR {
    sektor: string;
    total: number;
    count: number;
}
export interface PersenTotalMitra {
    mitra: string;
    total: number;
}
export interface PersenTotalKecamatan {
    kecamatan: string;
    total: number;
}

export interface Realisasi {
    dataCSR: DataCSR[];
    persenTotalMitra: PersenTotalMitra[];
    persenTotalKecamatan: PersenTotalKecamatan[];
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};
