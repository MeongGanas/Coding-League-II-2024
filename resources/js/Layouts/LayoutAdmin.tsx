import NavbarAdmin from "@/Components/admin/NavbarAdmin";
import Footer from "@/Components/all/Footer";
import { ReactNode } from "react";

export default function LayoutAdmin({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <NavbarAdmin />

            <main className="min-h-[calc(100vh_-_theme(spacing.16))] bg-[#F2F4F7]">
                {children}
            </main>

            <Footer logged={true} />
        </div>
    );
}
