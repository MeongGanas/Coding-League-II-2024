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
                        active="Dashboard"
                    />
                    <NavLink
                        nama="Kegiatan"
                        href="/admin/kegiatan"
                        active="Kegiatan"
                    />
                    <NavLink
                        nama="Proyek"
                        href="/admin/proyek"
                        active="Proyek"
                    />
                    <NavLink
                        nama="Sektor"
                        href="/admin/sektor"
                        active="Sektor"
                    />
                    <NavLink
                        nama="Laporan"
                        href="/admin/laporan"
                        active="Laporan"
                    />
                    <NavLink nama="Mitra" href="/admin/mitra" active="Mitra" />
                </nav>
            </SheetContent>
        </Sheet>
    );
}
