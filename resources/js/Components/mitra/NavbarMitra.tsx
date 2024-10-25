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
import LogoutButton from "../all/LogoutButton";
import { User as UserType } from "@/types";
import { AvatarFallback, AvatarImage, Avatar } from "../ui/avatar";
import Notifikasi from "../all/Notifikasi";

export default function NavbarMitra({ user, notifications }: { user: UserType, notifications: any }) {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background">
            <div className="container flex py-4 justify-between items-center gap-4 px-4 md:px-6">
                <Link href="/mitra/dashboard">
                    <img src="/images/nav_logo.png" alt="logo" width={150} />
                </Link>
                <div className="flex items-center">
                    <div className="flex items-center md:gap-2">
                        <div className="flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="flex items-center gap-2">
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
                                        <Link href="/mitra/perusahaan">
                                            Profile Perusahaan
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        asChild
                                        className="cursor-pointer"
                                    >
                                        <Link href="/mitra/user">
                                            Profile User
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className="border-black/10 border" />
                                    <LogoutButton />
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Notifikasi notifications={notifications} user={user} />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
