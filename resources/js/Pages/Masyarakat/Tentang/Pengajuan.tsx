import OtherWelcomeSection from "@/Components/masyarakat/OtherWelcomeSection";
import PengajuanForm from "@/Components/masyarakat/tentang/PengajuanForm";
import LayoutMasyarakat from "@/Layouts/LayoutMasyarakat";
import { PageProps } from "@/types";

export default function Pengajuan({ auth: { user } }: PageProps) {
    return (
        <LayoutMasyarakat user={user} title="Pengajuan">
            <OtherWelcomeSection title={"Pengajuan"} desc={"Tentang CSR Kabupaten Cirebon"} />
            <PengajuanForm />
        </LayoutMasyarakat>
    )
}