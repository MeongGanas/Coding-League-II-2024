import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "@inertiajs/react";
import NavLink from "../all/NavLink";

export default function AdminSheet() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 ml-4 lg:hidden"
                >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <nav className="grid gap-6 text-lg font-medium">
                    <Link href="#">
                        <img
                            src="/images/nav_logo.png"
                            alt="logo"
                            width={150}
                        />
                    </Link>
                    <NavLink
                        nama="Dashboard"
                        href="/admin/dashboard"
                        active="dashboard"
                    />
                    <NavLink
                        nama="Kegiatan"
                        href="/admin/kegiatan"
                        active="kegiatan"
                    />
                    <NavLink
                        nama="Proyek"
                        href="/admin/proyek"
                        active="proyek"
                    />
                    <NavLink
                        nama="Sektor"
                        href="/admin/sektor"
                        active="sektor"
                    />
                    <NavLink
                        nama="Laporan"
                        href="/admin/laporan"
                        active="laporan"
                    />
                    <NavLink nama="Mitra" href="/admin/mitra" active="mitra" />
                </nav>
            </SheetContent>
        </Sheet>
    );
}
