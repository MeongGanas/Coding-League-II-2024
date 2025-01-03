import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { router } from "@inertiajs/react";

export default function SearchForm() {
    const [searchValue, setSearchValue] = useState<string>("");
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const search = (e: SyntheticEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            const params = new URLSearchParams(window.location.search);

            if (value) {
                params.set("search", value);
            } else {
                params.delete("search");
            }

            if (params.has("page")) {
                params.set("page", "1");
            }

            router.visit(
                `${window.location.pathname}?${params.toString()}`
            );
        }, 500);
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const search = params.get("search");
        if (search) {
            setSearchValue(search);
        }
    }, []);

    return (
        <div className="relative flex-1 ml-auto md:grow-0">
            <Search className="absolute left-2.5 top-[11px] h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Cari..."
                onInput={search}
                defaultValue={searchValue}
                className="w-full rounded-lg bg-background pl-8"
            />
        </div>
    );
}
