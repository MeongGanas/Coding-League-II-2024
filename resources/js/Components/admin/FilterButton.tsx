import { Link } from "@inertiajs/react";
import { Badge } from "../ui/badge";

export default function CategoryButton({ category }: { category: string }) {
    const params = new URLSearchParams(window.location.search);
    const active = params.get("category") === category;

    return (
        <Link href={category !== "semua" ? `?category=${category}` : "/"}>
            <Badge
                className={`${
                    active || category === "semua"
                        ? "bg-blue-900"
                        : "bg-transparent text-black"
                } px-3 py-1 hover:bg-blue-900 hover:text-white text-base capitalize`}
            >
                {category}
            </Badge>
        </Link>
    );
}
