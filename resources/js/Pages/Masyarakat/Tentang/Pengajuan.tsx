import OtherWelcomeSection from "@/Components/masyarakat/OtherWelcomeSection";
import PengajuanForm from "@/Components/masyarakat/tentang/PengajuanForm";
import LayoutMasyarakat from "@/Layouts/LayoutMasyarakat";
import { Mitra, PageProps, Proyek } from "@/types";

export default function Pengajuan({ auth: { user }, proyeks, mitras }: PageProps<{ proyeks: Proyek[], mitras: Mitra[] }>) {
    console.log(proyeks, mitras)

    return (
        <LayoutMasyarakat user={user} title="Pengajuan">
            <OtherWelcomeSection title={"Pengajuan"} desc={"Tentang CSR Kabupaten Cirebon"} />
            <PengajuanForm proyeks={proyeks} mitras={mitras} />
        </LayoutMasyarakat>
    )
}