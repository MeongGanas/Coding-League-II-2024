import DataStatistikSection from "@/Components/masyarakat/statistik/DataStatistikSection";
import OtherWelcomeSection from "@/Components/masyarakat/OtherWelcomeSection";
import LayoutMasyarakat from "@/Layouts/LayoutMasyarakat";
import { Counts, PageProps } from "@/types";
import RealisasiProyekPublik from "@/Components/masyarakat/statistik/RealisasiProyekPublik";

export default function StatistikPage({ auth: { user }, counts, filters, realisasi }: PageProps<{ counts: Counts, filters: any[any], realisasi: any[any] }>) {
    return (
        <LayoutMasyarakat user={user} title="Statistik">
            <OtherWelcomeSection title="Statistik" desc="Program CSR yang sudah berjalan di kabupaten cirebon" />
            <DataStatistikSection counts={counts} possibleYear={filters.tahun} />
            <RealisasiProyekPublik realisasi={realisasi} />
        </LayoutMasyarakat>
    )
}