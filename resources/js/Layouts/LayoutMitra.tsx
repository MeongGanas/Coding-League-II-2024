import NavbarAdmin from "@/Components/admin/NavbarAdmin";
import Footer from "@/Components/all/Footer";
import NavbarMitra from "@/Components/mitra/NavbarMitra";
import { User } from "@/types";
import { ReactNode } from "react";

export default function LayoutMitra({ children, user, notifications }: { children: ReactNode, user: User, notifications: any }) {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <NavbarMitra user={user} notifications={notifications} />

            <main className="min-h-[calc(100vh_-_theme(spacing.16))] bg-[#F2F4F7]">
                {children}
            </main>

            <Footer logged={user ? true : false} />
        </div>
    );
}
