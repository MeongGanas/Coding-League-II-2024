import DataStatistik from "@/Components/admin/dashboard/DataStatistik";
import RealisasiProyek from "@/Components/admin/dashboard/RealisasiProyek";
import SelectAndDownload from "@/Components/admin/SelectAndDownload";
import WelcomeAdmin from "@/Components/admin/dashboard/WelcomeAdmin";
import LayoutAdmin from "@/Layouts/LayoutAdmin";
import { Head } from "@inertiajs/react";
import { PageProps, Statistik } from "@/types";

export default function Dashboard({ auth: { user }, statistik, realisasi_per_sektor }: PageProps<{ statistik: Statistik; realisasi_per_sektor: any }>) {
    console.log(realisasi_per_sektor)
    return (
        <LayoutAdmin user={user}>
            <Head title="Dashboard Admin" />

            <WelcomeAdmin />

            <div className="container py-10 px-5">
                <SelectAndDownload
                    menu="dashboard"
                    tahun={true}
                    kuartal={true}
                    sektor={true}
                    mitra={true}
                />
                <DataStatistik statistik={statistik} />
                <RealisasiProyek />
            </div>
        </LayoutAdmin>
    );
}
