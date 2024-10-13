import { Button } from "@/Components/ui/button";
import { PaginationProps } from "@/types";
import { Link } from "@inertiajs/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SyntheticEvent, useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";

export function TablePagination({ data }: { data: PaginationProps }) {
    const [page, setPage] = useState<string>("");

    const changePage = (value: string) => {
        const params = new URLSearchParams(window.location.search);

        if (value) {
            params.set("page", value);
        } else {
            params.delete("page");
        }

        window.location.replace(
            `${window.location.pathname}?${params.toString()}`
        );
    };

    const prev = () => {
        const currentPage = parseInt(page)
        if (currentPage > 1) {
            changePage((currentPage - 1).toString())
        }
    }

    const next = () => {
        const currentPage = parseInt(page)
        if (currentPage < data.links.slice(1, -1).length) {
            changePage((currentPage + 1).toString())
        }
    }


    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const page = params.get("page");
        if (page) {
            setPage(page);
        }
    }, []);

    return (
        <div className="border rounded-md mx-auto lg:mx-0 w-fit flex items-center overflow-hidden">
            <Button
                variant={"ghost"}
                className="gap-1 items-center rounded-none"
                onClick={prev}
            >
                <ArrowLeft className="w-5 h-5" /> Sebelumnya
            </Button>
            {data.links.length > 4 ? (
                <>
                    <Button
                        variant={"ghost"}
                        onClick={() => changePage("1")}
                        className={`gap-1 border-l items-center rounded-none ${data.links[1].active ? 'bg-black/5' : ''}`}
                    >
                        {data.links[1].label}
                    </Button>
                    <Button
                        variant={"ghost"}
                        className="border-l rounded-none px-0 w-10"
                    >
                        <input type="tel" placeholder="..." className="w-full hover:bg-gray-100 text-center border-none focus:ring-0 focus:outline-none" name="page" onChange={(e) => changePage(e.target.value)} />
                    </Button>
                    <Button
                        variant={"ghost"}
                        onClick={() => changePage((data.links.length - 2).toString())}
                        className={`gap-1 border-l items-center rounded-none ${data.links[data.links.length - 2].active ? 'bg-black/5' : ''}`}
                    >
                        {data.links[data.links.length - 2].label}
                    </Button>
                </>
            ) : (
                <>
                    {data.links.slice(1, -1).map((link, i) => (
                        <Button
                            variant={"ghost"}
                            onClick={() => changePage((i + 1).toString())}
                            className={`gap-1 border-l items-center rounded-none ${link.active ? 'bg-black/5' : ''}`}
                            key={i}
                        >
                            {link.label}
                        </Button>
                    ))}
                </>
            )}

            <Button
                variant={"ghost"}
                className="gap-1 items-center rounded-none border-l"
                onClick={next}
            >
                Selanjutnya <ArrowRight className="w-5 h-5" />
            </Button>
        </div>
    );
}

export function TableSelectTotalPaginate({ data }: { data: PaginationProps }) {
    const [paginateValue, setPaginateValue] = useState<string>("");

    const paginate = (value: string) => {
        const params = new URLSearchParams(window.location.search);

        if (value) {
            params.set("paginate", value);
        } else {
            params.delete("paginate");
        }

        if (params.has("page")) {
            params.set("page", "1");
        }

        window.location.replace(
            `${window.location.pathname}?${params.toString()}`
        );
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const paginate = params.get("paginate");
        if (paginate) {
            setPaginateValue(paginate);
        }
    }, []);

    return (
        <div className="flex items-center justify-center gap-4">
            <h1 className="text-neutral-600 font-bold">
                Tampilkan Data
            </h1>
            <Select onValueChange={paginate}>
                <SelectTrigger className="w-14">
                    <SelectValue placeholder={paginateValue || "5"} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="15">15</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <h1 className="text-neutral-600 font-bold">
                {data.from}-{data.to} data dari {data.total} data.
            </h1>
        </div>
    )
}