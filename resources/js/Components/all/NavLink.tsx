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
            className={`transition-colors relative hover:text-primary text-base ${
                route().current()?.includes(active)
                    ? "border-b-2 border-b-primary text-primary"
                    : "text-foreground"
            }`}
        >
            {nama}
        </Link>
    );
}
