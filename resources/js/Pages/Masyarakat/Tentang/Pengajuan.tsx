import OtherWelcomeSection from "@/Components/masyarakat/OtherWelcomeSection";
import PengajuanForm from "@/Components/masyarakat/tentang/PengajuanForm";
import LayoutMasyarakat from "@/Layouts/LayoutMasyarakat";
import {Mitra, PageProps, Proyek, ServerMessage} from "@/types";
import {useEffect} from "react";
import {toast} from "react-hot-toast";


export default function Pengajuan({ auth: { user }, proyeks, mitras, server_message }: PageProps<{ proyeks: Proyek[], mitras: Mitra[], server_message: ServerMessage }>) {
    useEffect(() => {
        if (server_message) {
            console.log(server_message);
            if (!['error', 'success'].includes(server_message.severity)) {
                server_message.severity = 'error';
            }
            toast[server_message.severity](server_message.message);
        }
    }, []);

    return (
        <LayoutMasyarakat user={user} title="Pengajuan">
            <OtherWelcomeSection title={"Pengajuan"} desc={"Tentang CSR Kabupaten Cirebon"} />
            <PengajuanForm proyeks={proyeks} mitras={mitras} />
        </LayoutMasyarakat>
    )
}
