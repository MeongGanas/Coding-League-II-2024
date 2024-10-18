import { Badge } from "@/Components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Link } from "@inertiajs/react";
import { ArrowDown, ArrowUp, Eye, Pencil } from "lucide-react";
import { TablePagination, TableSelectTotalPaginate } from "./TabelPagination";
import { Button } from "@/Components/ui/button";
import { SektorsProps } from "@/types";

const tableHeader = [
    {title: "Nama Sektor", sortable: true, sortKey: "name", className: "min-w-[200px]"},
    {title: "Deskripsi Sektor", sortable: true, sortKey: "deskripsi"},
    {title: "Aksi", className: "text-center"},
]
export default function DataTableSektor({ sektors }: { sektors: SektorsProps }) {

    const params = new URLSearchParams(window.location.search);
    const currentSort = params.get("sort");
    const order = params.get("order");

    const handleSort = (sort?: string) => {
        if (!sort) return;

        if (currentSort === sort && order === "asc") {
            params.delete("sort");
            params.delete("order");
            params.delete("page");
            params.delete("with");
        } else if (currentSort === sort && order === "desc") {
            params.set("order", "asc" );
        } else {
            params.set("sort", sort);
            params.set("order", "desc");
            params.delete("page");
        }

        window.location.replace(
            `${window.location.pathname}?${params.toString()}`
        );
    }

    return (
        <div className="w-full">
            <div className="bg-white rounded-md border">
                <Table className="overflow-x-auto">
                    <TableHeader>
                        <TableRow className="tablerow">
                            {
                               tableHeader && tableHeader.map(header => (
                                    <TableHead
                                    key={header.title}
                                     onClick={
                                        () => {
                                            if (header.sortable) {
                                                handleSort(header.sortKey);
                                            }
                                        }
                                    } className={`${header.sortable ? 'sortable' : ''} uppercase font-bold text-black text-nowrap ${currentSort === header.sortKey ? '!bg-gray-200' : ''} ${header.className || ''}`}>
                                        {header.title} {
                                            header.sortable ?
                                                currentSort === header.sortKey
                                                ? order === "asc"
                                                    ? <ArrowUp className="w-4 h-4 inline-block" />
                                                    : <ArrowDown className="w-4 h-4 inline-block" />
                                                : <ArrowDown className="w-4 h-4 inline-block" />
                                            : null
                                        }
                                    </TableHead>
                                ))
                            }
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sektors.data.length > 0 ? sektors.data.map(sektor => (
                            <TableRow className="odd:bg-[#FCFCFD] even:bg-white" key={sektor.id}>
                                <TableCell className="text-base min-w-[200px]">{sektor.name}</TableCell>
                                <TableCell className="text-base">
                                    {sektor.deskripsi}
                                </TableCell>
                                <TableCell className="justify-center flex items-center gap-1">
                                    <Button
                                        asChild
                                        variant={"ghost"}
                                        className="px-2"
                                    >
                                        <Link href={`/admin/sektor/${sektor.id}`}>
                                            <Eye />
                                        </Link>
                                    </Button>
                                    <Button
                                        asChild
                                        variant={"ghost"}
                                        className="px-2"
                                    >
                                        <Link href={`/admin/sektor/${sektor.id}/edit`}>
                                            <Pencil className="w-5 h-5" />
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow className="odd:bg-[#FCFCFD] even:bg-white">
                                <TableCell className="text-base text-center" colSpan={3}>Belum ada data sektor dibuat</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <div className="p-4 border-t space-y-5 lg:space-y-0 lg:flex lg:justify-between">
                    <TableSelectTotalPaginate data={sektors} />
                    <TablePagination data={sektors} />
                </div>
            </div>
        </div>
    );
}
