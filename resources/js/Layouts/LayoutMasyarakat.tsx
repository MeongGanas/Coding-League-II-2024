import NavbarAdmin from "@/Components/admin/NavbarAdmin";
import Footer from "@/Components/all/Footer";
import NavbarMasyarakat from "@/Components/masyarakat/NavbarMasyarakat";
import { User } from "@/types";
import { ReactNode } from "react";

export default function LayoutMasyarakat({ children, user }: { children: ReactNode, user: User }) {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <NavbarMasyarakat user={user} />

            <main className="min-h-[calc(100vh_-_theme(spacing.16))]">
                {children}
            </main>

            <Footer logged={true} />
        </div>
    );
}
