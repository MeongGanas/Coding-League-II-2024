import Footer from "@/Components/all/Footer";
import { ReactNode } from "react";

export default function LayoutAuth({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <div className="border-b p-4">
                <img
                    src="/images/nav_logo.png"
                    width={150}
                    className="mx-auto"
                    alt=""
                />
            </div>

            <main className="min-h-[calc(100vh_-_theme(spacing.16))] bg-[#F2F4F7] flex items-center">
                {children}
            </main>

            <Footer logged={true} />
        </div>
    );
}