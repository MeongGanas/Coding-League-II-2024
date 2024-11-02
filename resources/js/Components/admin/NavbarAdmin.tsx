import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Link } from "@inertiajs/react";
import { User } from "lucide-react";
import NavLink from "../all/NavLink";
import Notifikasi from "../all/Notifikasi";
import AdminSheet from "./AdminSheet";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import LogoutButton from "../all/LogoutButton";
import { User as UserType } from "@/types";
import { AvatarFallback, AvatarImage, Avatar } from "../ui/avatar";

export default function NavbarAdmin({
    user,
    notifications,
}: {
    user: UserType;
    notifications: any;
}) {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background">
            <div className="container flex py-4 justify-between items-center gap-4 px-4 md:px-6">
                <Link href="/admin/dashboard">
                    <img src="/images/nav_logo.png" alt="logo" width={150} />
                </Link>
                <nav className="hidden flex-col gap-6 text-lg font-medium lg:flex lg:flex-row lg:items-center lg:text-sm lg:gap-10">
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
                <div className="flex items-center">
                    <div className="flex items-center md:gap-2">
                        <div className="flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="flex items-center gap-2 cursor-pointer">
                                        <div className="text-end hidden sm:block cursor-pointer -space-y-1">
                                            <h1 className="text-sm font-bold">
                                                {user.name}
                                            </h1>
                                            <p className="text-neutral-500 text-sm">
                                                {user.role}
                                            </p>
                                        </div>
                                        <Avatar>
                                            {user.image && (
                                                <AvatarImage
                                                    src={`/storage/${user.image}`}
                                                    alt="user_image"
                                                />
                                            )}
                                            <AvatarFallback>
                                                <User className="w-5 h-5" />
                                            </AvatarFallback>
                                        </Avatar>
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem
                                        asChild
                                        className="cursor-pointer"
                                    >
                                        <Link href="/admin/profile">
                                            Profile
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className="border-black/10 border" />
                                    <LogoutButton />
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Notifikasi
                                notifications={notifications}
                                user={user}
                            />
                        </div>
                    </div>
                    <AdminSheet />
                </div>
            </div>
        </header>
    );
}
