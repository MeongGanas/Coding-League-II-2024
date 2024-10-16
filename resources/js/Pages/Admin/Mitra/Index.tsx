import DataTableMitra from "@/Components/admin/dashboard/table/TabelMitra";
import SearchForm from "@/Components/admin/Search";
import BreadcrumbLinks from "@/Components/all/BreadcrumbLinks";
import { Button } from "@/Components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import LayoutAdmin from "@/Layouts/LayoutAdmin";
import { MitrasProps, PageProps } from "@/types";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";



export default function Index({ auth: { user }, mitras }: PageProps<{ mitras: MitrasProps }>) {

    const params = new URLSearchParams(window.location.search);
    const sortall = params.get("sortall") as string
    const [selectedValue, setSelectedValue] = useState(sortall || "terbaru");

    const handleFilterChange = (value: string) => {
        setSelectedValue(value);
        if (value === "terbaru") {
            params.set("sortall", "terbaru");
        } else if (value === "terlama") {
            params.set("sortall", "terlama");
        }

        window.location.replace(
            `${window.location.pathname}?${params.toString()}`
        )
    }

    return (
        <LayoutAdmin user={user}>
            <Head title="Mitra" />
            <div className="container py-10 px-5 space-y-5">
                <div className="mb-10">
                    <BreadcrumbLinks basePath="/admin" />
                </div>
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Mitra</h1>
                    <Button asChild className="hover:bg-red-700">
                        <Link
                            href="/admin/mitra/create"
                            className="flex items-center gap-1"
                        >
                            <Plus className="w-4 h-4" />
                            Buat Mitra Baru
                        </Link>
                    </Button>
                </div>
                <div className="grid grid-cols-5 gap-4">
                    <div className="col-span-4">
                        <SearchForm />
                    </div>
                    <Select  onValueChange={handleFilterChange} value={selectedValue}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Sortir" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="terbaru">Terbaru</SelectItem>
                                <SelectItem value="terlama">Terlama</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <DataTableMitra mitras={mitras} />
            </div>
        </LayoutAdmin>
    );
}
