import DataStatistikSection from "@/Components/masyarakat/statistik/DataStatistikSection";
import OtherWelcomeSection from "@/Components/masyarakat/OtherWelcomeSection";
import LayoutMasyarakat from "@/Layouts/LayoutMasyarakat";
import { PageProps, Statistik } from "@/types";
import RealisasiProyekPublik from "@/Components/masyarakat/statistik/RealisasiProyekPublik";

export default function StatistikPage({ auth: { user }, statistik }: PageProps<{ statistik: Statistik }>) {
    return (
        <LayoutMasyarakat user={user} title="Statistik">
            <OtherWelcomeSection title="Statistik" desc="Program CSR yang sudah berjalan di kabupaten cirebon" />
            <DataStatistikSection statistik={statistik} />
            <RealisasiProyekPublik />
        </LayoutMasyarakat>
    )
}