import OtherWelcomeSection from "@/Components/masyarakat/OtherWelcomeSection";
import ProyekListSection from "@/Components/masyarakat/sektor/ProyekListSection";
import SektorListSection from "@/Components/masyarakat/sektor/SektorListSection";
import LayoutMasyarakat from "@/Layouts/LayoutMasyarakat";
import { PageProps, Proyek, Sektor } from "@/types";
import { useEffect, useRef } from "react";

export default function SektorPage({ auth: { user }, sektors, proyeks }: PageProps<{ sektors: Sektor[], proyeks: Proyek[] }>) {
    const refProyekList = useRef<HTMLDivElement>(null);
    const params = new URLSearchParams(window.location.search);

    useEffect(() => {
        if (params.has("sektor")) {
            setTimeout(() => {
                refProyekList.current?.scrollIntoView({ behavior: "smooth" });
            }, 200);
        }
    }, [params]);


    return (
        <LayoutMasyarakat user={user} title="Sektor">
            <OtherWelcomeSection title="Sektor" desc="Program CSR yang sudah berjalan di kabupaten cirebon" />
            <SektorListSection sektors={sektors} />
            <div ref={refProyekList}>
                <ProyekListSection proyeks={proyeks} sektors={sektors} />
            </div>
        </LayoutMasyarakat>
    )
}
