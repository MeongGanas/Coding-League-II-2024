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
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { User as UserType } from "@/types";
import { AvatarFallback, AvatarImage, Avatar } from "../ui/avatar";
import LogoutButton from "../all/LogoutButton";
import MasyarakatSheet from "./MasyarakatSheet";

export default function NavbarMasyarakat({ user }: { user: UserType }) {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background">
            <div className="container flex py-4 justify-between items-center gap-4 px-4 md:px-6">
                <Link href="/admin/dashboard">
                    <img src="/images/nav_logo.png" alt="logo" width={150} />
                </Link>
                <nav className="hidden flex-col gap-6 text-lg font-medium lg:flex lg:flex-row lg:items-center lg:text-sm lg:gap-10">
                    <NavLink
                        nama="Beranda"
                        href="/"
                        active="beranda"
                    />
                    <NavLink
                        nama="Tentang"
                        href="/tentang"
                        active="tentang"
                    />
                    <NavLink
                        nama="Kegiatan"
                        href="/kegiatan"
                        active="kegiatan"
                    />
                    <NavLink
                        nama="Statistik"
                        href="/statistik"
                        active="statistik"
                    />
                    <NavLink
                        nama="Sektor"
                        href="/sektor"
                        active="sektor"
                    />
                    <NavLink
                        nama="Laporan"
                        href="/laporan"
                        active="laporan"
                    />
                    <NavLink nama="Mitra" href="/mitra" active="mitra" />
                </nav>
                <div className="flex items-center">
                    <div className="flex items-center md:gap-2">
                        <div className="flex items-center gap-3">
                            {user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <div className="flex items-center gap-2">
                                            <div className="text-end hidden sm:block cursor-pointer -space-y-1">
                                                <h1 className="text-sm">
                                                    {user.name}
                                                </h1>
                                                <p className="text-neutral-500 text-sm">
                                                    {user.role}
                                                </p>
                                            </div>
                                            <Avatar>
                                                {user.image && (
                                                    <AvatarImage src={`/storage/${user.image}`} alt="user_image" />
                                                )}
                                                <AvatarFallback><User className="w-5 h-5" /></AvatarFallback>
                                            </Avatar>
                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem
                                            asChild
                                            className="cursor-pointer"
                                        >
                                            <Link href={`${user.role === "admin" ? "/admin/dashboard" : "/mitra/dashboard"}`}>
                                                Dashboard
                                            </Link>
                                        </DropdownMenuItem>
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
                            ) : (
                                <Button asChild className="hover:bg-red-700">
                                    <Link href="/register">Pengajuan</Link>
                                </Button>
                            )}
                        </div>
                    </div>
                    <MasyarakatSheet />
                </div>
            </div>
        </header>
    );
}
