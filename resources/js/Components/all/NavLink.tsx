import { Link } from "@inertiajs/react";

export default function NavLink({
    nama,
    href,
    active,
}: {
    nama: string;
    href: string;
    active: string;
}) {
    return (
        <Link
            href={href}
            className={`transition-colors relative hover:text-[#98100A] text-base ${
                route().current()?.includes(active)
                    ? "border-b-2 border-b-[#98100A] text-[#98100A]"
                    : "text-foreground"
            }`}
        >
            {nama}
        </Link>
    );
}
