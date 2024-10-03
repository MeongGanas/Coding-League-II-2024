import NavbarAdmin from "@/Components/admin/NavbarAdmin";
import Footer from "@/Components/all/Footer";
import { ReactNode } from "react";

export default function LayoutAdmin({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <NavbarAdmin />

            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                {children}
            </main>

            <Footer logged={true} />
        </div>
    );
}