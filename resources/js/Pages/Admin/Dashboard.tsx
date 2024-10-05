import DataStatistik from "@/Components/admin/dashboard/DataStatistik";
import RealisasiProyek from "@/Components/admin/dashboard/RealisasiProyek";
import SelectAndDownload from "@/Components/admin/SelectAndDownload";
import WelcomeAdmin from "@/Components/admin/dashboard/WelcomeAdmin";
import LayoutAdmin from "@/Layouts/LayoutAdmin";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <LayoutAdmin>
            <Head title="Dashboard Admin" />

            <WelcomeAdmin />

            <div className="container py-10 px-5">
                <SelectAndDownload
                    tahun={true}
                    kuartal={true}
                    sektor={true}
                    mitra={true}
                />
                <DataStatistik />
                <RealisasiProyek />
            </div>
        </LayoutAdmin>
    );
}
