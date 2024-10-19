import DataStatistik from "@/Components/admin/dashboard/DataStatistik";
import RealisasiProyek from "@/Components/admin/dashboard/RealisasiProyek";
import SelectAndDownload from "@/Components/admin/SelectAndDownload";
import WelcomeAdmin from "@/Components/admin/dashboard/WelcomeAdmin";
import LayoutAdmin from "@/Layouts/LayoutAdmin";
import { Head } from "@inertiajs/react";
import { PageProps, RealisasiSektor, Statistik } from "@/types";

export default function Dashboard({ auth: { user }, counts, realisasi, filters }: PageProps<{ counts: Statistik, realisasi: RealisasiSektor[], filters: any }>) {
    return (
        <LayoutAdmin user={user}>
            <Head title="Dashboard Admin" />

            <WelcomeAdmin />

            <div className="container py-10 px-5">
                <SelectAndDownload
                    menu="dashboard"
                    tahunOptions={filters.tahun}
                    sektors={filters.sektors}
                    tahun={true}
                    kuartal={true}
                    sektor={true}
                    mitra={true}
                />
                <DataStatistik counts={counts} />
                <RealisasiProyek realisasi={realisasi}/>
            </div>
        </LayoutAdmin>
    );
}
