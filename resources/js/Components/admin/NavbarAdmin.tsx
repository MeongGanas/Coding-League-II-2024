import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Link } from "@inertiajs/react";
import { User } from "lucide-react";
import NavLink from "../all/NavLink";
import Notifikasi from "./Notifikasi";
import AdminSheet from "./AdminSheet";

export default function NavbarAdmin() {
    return (
        <header className="sticky top-0 w-full border-b bg-background">
            <div className="container flex py-4 justify-between items-center gap-4 px-4 md:px-6">
                <Link href="/admin/dashboard">
                    <img src="/images/nav_logo.png" alt="logo" width={150} />
                </Link>
                <nav className="hidden flex-col gap-6 text-lg font-medium lg:flex lg:flex-row lg:items-center lg:text-sm lg:gap-10">
                    <NavLink
                        nama="Dashboard"
                        href="/admin/dashboard"
                        active="adminDashboard"
                    />
                    <NavLink
                        nama="Kegiatan"
                        href="/admin/kegiatan"
                        active="adminKegiatan"
                    />
                    <NavLink
                        nama="Proyek"
                        href="/admin/proyek"
                        active="adminProyek"
                    />
                    <NavLink
                        nama="Sektor"
                        href="/admin/sektor"
                        active="adminSektor"
                    />
                    <NavLink
                        nama="Laporan"
                        href="/admin/laporan"
                        active="adminLaporan"
                    />
                    <NavLink
                        nama="Mitra"
                        href="/admin/mitra"
                        active="adminMitra"
                    />
                </nav>
                <div className="flex items-center">
                    <div className="flex items-center md:gap-2">
                        <div className="flex items-center gap-3">
                            <div className="text-end -sapce-y-2">
                                <h1>{"Ardhiya Febrian R"}</h1>
                                <p className="text-neutral-500">{"Role"}</p>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Button
                                        variant="secondary"
                                        size="icon"
                                        className="rounded-full"
                                    >
                                        <User className="h-6 w-6" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>
                                        <Link
                                            href={route("logout")}
                                            method="post"
                                        >
                                            Logout
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Notifikasi />
                        </div>
                    </div>
                    <AdminSheet />
                </div>
            </div>
        </header>
    );
}
