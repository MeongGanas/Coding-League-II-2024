import DataStatistikSection from "@/Components/masyarakat/statistik/DataStatistikSection";
import OtherWelcomeSection from "@/Components/masyarakat/OtherWelcomeSection";
import LayoutMasyarakat from "@/Layouts/LayoutMasyarakat";
import { PageProps } from "@/types";
import RealisasiProyekPublik from "@/Components/masyarakat/statistik/RealisasiProyekPublik";

export default function Home({ auth: { user } }: PageProps) {
    return (
        <LayoutMasyarakat user={user} title="Statistik">
            <OtherWelcomeSection title="Statistik" desc="Program CSR yang sudah berjalan di kabupaten cirebon" />
            <DataStatistikSection />
            <RealisasiProyekPublik />
        </LayoutMasyarakat>
    )
}