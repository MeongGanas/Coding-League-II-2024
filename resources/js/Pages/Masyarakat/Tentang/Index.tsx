import SambutanSection from "@/Components/masyarakat/home/SambuatanSection";
import WhatSection from "@/Components/masyarakat/tentang/WhatSection";
import OtherWelcomeSection from "@/Components/masyarakat/OtherWelcomeSection";
import TujuanSection from "@/Components/masyarakat/tentang/TujuanSection";
import LayoutMasyarakat from "@/Layouts/LayoutMasyarakat";
import { Laporan, PageProps } from "@/types";
import LaporanSection from "@/Components/masyarakat/tentang/LaporanSection";
import ManfaatSection from "@/Components/masyarakat/tentang/ManfaatSection";
import PanduanSection from "@/Components/masyarakat/tentang/PanduanSection";

export default function Tentang({ auth: { user }, laporans }: PageProps<{ laporans: Laporan[] }>) {
    return (
        <LayoutMasyarakat user={user} title="Tentang">
            <OtherWelcomeSection title="Tentang" desc="Tentang CSR Kabupaten Cirebon" />
            <WhatSection />
            <TujuanSection />
            <ManfaatSection />
            <LaporanSection laporans={laporans} />
            <SambutanSection />
            <PanduanSection />
        </LayoutMasyarakat>
    )
}