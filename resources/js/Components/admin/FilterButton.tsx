import { Link } from "@inertiajs/react";
import { Badge } from "../ui/badge";

export default function CategoryButton({ category, active }: { category: string, active: string }) {
    const params = new URLSearchParams(window.location.search);
    const paramsCategory = params.get("category") ? params.get("category") : "semua"
    const isActive = paramsCategory === active;

    return (
        <Link href={category !== "semua" ? `?category=${category}` : "/admin/proyek"}>
            <Badge
                className={`${isActive
                    ? "bg-blue-900"
                    : "bg-transparent text-black"
                    } px-3 py-1 hover:bg-blue-900 hover:text-white text-base capitalize`}
            >
                {category}
            </Badge>
        </Link>
    );
}
