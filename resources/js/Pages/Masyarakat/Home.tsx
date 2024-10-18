import DataStatistikSection from "@/Components/masyarakat/home/DataStatistikSection";
import FAQSection from "@/Components/masyarakat/home/FAQSection";
import KegiatanSection from "@/Components/masyarakat/home/KegiatanSection";
import LaporanSection from "@/Components/masyarakat/home/LaporanSection";
import MitraSection from "@/Components/masyarakat/home/MitraSection";
import SambutanSection from "@/Components/masyarakat/home/SambuatanSection";
import SektorSection from "@/Components/masyarakat/home/SektorSection";
import WelcomeSection from "@/Components/masyarakat/home/WelcomeSection";
import WhatSection from "@/Components/masyarakat/home/WhatSection";
import LayoutMasyarakat from "@/Layouts/LayoutMasyarakat";
import { Kegiatan, Laporan, Mitra, PageProps } from "@/types";

export default function Home({ auth: { user }, kegiatans, laporans, mitras, statistik }: PageProps<{ kegiatans: Kegiatan[], laporans: Laporan[], mitras: any[], statistik: any[] }>) {
    return (
        <LayoutMasyarakat user={user} title="Home">
            <WelcomeSection />
            <MitraSection mitras={mitras} />
            <DataStatistikSection statistik={statistik} />
            <WhatSection />
            <SektorSection />
            <SambutanSection />
            <KegiatanSection kegiatans={kegiatans} />
            <LaporanSection laporans={laporans} />
            <FAQSection />
        </LayoutMasyarakat>
    )
}
