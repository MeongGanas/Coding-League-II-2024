import { Link } from "@inertiajs/react";
import { Button } from "../ui/button";

export default function Footer({ logged }: { logged: boolean }) {
    return (
        <footer className="p-5 bg-[#101828] text-neutral-200">
            <div className="container flex items-center justify-between">
                <div className="space-y-2">
                    <p>
                        © 2024 Corporate Social Responsibility Kabupaten Cirebon
                    </p>
                    <p>
                        Pemkab Kabupaten Cirebon, Badan Pendapatan Daerah
                        (Bapenda) Kabupaten Cirebon.
                    </p>
                </div>
                {logged ? (
                    <Button
                        variant={"outline"}
                        className="bg-transparent"
                        asChild
                    >
                        <Link href="/">Kembali Ke Halaman Utama</Link>
                    </Button>
                ) : (
                    <Button
                        variant={"outline"}
                        className="bg-transparent"
                        asChild
                    >
                        <Link href="/mitra/register">Masuk sebagai mitra</Link>
                    </Button>
                )}
            </div>
        </footer>
    );
}
