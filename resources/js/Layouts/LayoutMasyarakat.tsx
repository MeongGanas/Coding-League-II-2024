import Footer from "@/Components/all/Footer";
import ContactSection from "@/Components/masyarakat/ContactSection";
import NavbarMasyarakat from "@/Components/masyarakat/NavbarMasyarakat";
import { User } from "@/types";
import { Head } from "@inertiajs/react";
import { ReactNode } from "react";

export default function LayoutMasyarakat({ children, user, title }: { children: ReactNode, user: User, title: string }) {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <Head title={title} />

            <NavbarMasyarakat user={user} />

            <main className="min-h-[calc(100vh_-_theme(spacing.16))]">
                {children}
            </main>

            <ContactSection />
            <Footer logged={user ? true : false} />
        </div>
    );
}
