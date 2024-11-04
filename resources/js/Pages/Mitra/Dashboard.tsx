import DataStatistik from "@/Components/mitra/DataStatistik";
import RealisasiProyek from "@/Components/mitra/RealisasiProyek";
import SelectAndDownload from "@/Components/admin/SelectAndDownload";
import { Head, Link } from "@inertiajs/react";
import { Counts, LaporanProps, PageProps, Realisasi } from "@/types";
import WelcomeMitra from "@/Components/mitra/WelcomeMitra";
import LayoutMitra from "@/Layouts/LayoutMitra";
import DataTableLaporanMitra from "@/Components/mitra/TabelLaporan";
import { Button } from "@/Components/ui/button";
import { Plus } from "lucide-react";
import SearchForm from "@/Components/admin/Search";
import { useEffect, useRef } from "react";
import {toast} from "react-hot-toast";

interface ServerMessage {
    message: string;
    severity: "error" | "success";
}
export default function Dashboard({
    auth: { user },
    counts,
    realisasi,
    filters,
    laporans,
    notifications,
    server_message,
}: PageProps<{
    counts: Counts;
    realisasi: Realisasi;
    filters: any;
    laporans: LaporanProps;
    notifications: any;
    server_message: ServerMessage;
}>) {
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.has("search") || params.has("sort")) {
            setTimeout(() => {
                const laporanMitraElement = document.getElementById("laporan-mitra");
                if (laporanMitraElement) {
                    laporanMitraElement.scrollIntoView({ behavior: "smooth" });
                }
            }, 20);
        }

        if (server_message) {
            if (!['error', 'success'].includes(server_message.severity)) {
                server_message.severity = 'error';
            }
            toast[server_message.severity](server_message.message);
        }
    }, []);

    return (
        <LayoutMitra user={user} notifications={notifications}>
            <Head title="Dashboard Mitra" />

            <WelcomeMitra />

            <div className="container py-10 px-5">
                <SelectAndDownload
                    menu="dashboard"
                    tahunOptions={filters.tahun}
                    tahun={true}
                    kuartal={true}
                />
                <DataStatistik counts={counts} />
                <RealisasiProyek realisasi={realisasi} />
            </div>

            <div id="laporan-mitra" className="container px-5 pb-10 space-y-5">
                <div className="flex items-center justify-between">
                    <h1 className="font-bold text-2xl">Laporan Mitra</h1>
                    <Button asChild className="hover:bg-red-700">
                        <Link
                            href="/mitra/laporan/create"
                            className="flex items-center gap-1"
                        >
                            <Plus className="w-4 h-4" />
                            Buat Laporan Baru
                        </Link>
                    </Button>
                </div>
                <SearchForm />
                <DataTableLaporanMitra laporans={laporans} />
            </div>
        </LayoutMitra>
    );
}
