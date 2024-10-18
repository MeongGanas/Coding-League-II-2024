import OtherWelcomeSection from "@/Components/masyarakat/OtherWelcomeSection";
import ProyekListSection from "@/Components/masyarakat/sektor/ProyekListSection";
import SektorListSection from "@/Components/masyarakat/sektor/SektorListSection";
import LayoutMasyarakat from "@/Layouts/LayoutMasyarakat";
import { PageProps, Proyek, Sektor } from "@/types";

export default function SektorPage({ auth: { user }, sektors, proyeks }: PageProps<{ sektors: Sektor[], proyeks: Proyek[] }>) {
    return (
        <LayoutMasyarakat user={user} title="Sektor">
            <OtherWelcomeSection title="Sektor" desc="Program CSR yang sudah berjalan di kabupaten cirebon" />
            <SektorListSection sektors={sektors} />
            <ProyekListSection proyeks={proyeks} sektors={sektors} />
        </LayoutMasyarakat>
    )
}