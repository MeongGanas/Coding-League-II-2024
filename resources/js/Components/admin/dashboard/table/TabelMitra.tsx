import { Badge } from "@/Components/ui/badge";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
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
import { Mitra, MitrasProps } from "@/types";
import { format } from "date-fns";

const status = {
    'Aktif': "bg-success-bg text-success",
    'Non-Aktif': "bg-error-bg text-error",
    'Pengajuan': "bg-warning-bg text-warning",
}

const tableHeader = [
    { title: "Foto", sortable: true, sortKey: "image", className: "min-w-[200px]" },
    { title: "Nama", sortable: true, sortKey: "name" },
    { title: "Nama PT", sortable: true, sortKey: "perusahaan", className: "min-w-[200px]" },
    { title: "Deskripsi", sortable: true, sortKey: "deskripsi", className: "min-w-[200px]" },
    { title: "Tgl terdaftar", sortable: true, sortKey: "tgl_aktif", className: "min-w-[200px]" },
    { title: "Status", sortable: true, sortKey: "status" },
    { title: "Aksi", className: "text-center" },
]

export default function DataTableMitra({ mitras }: { mitras: MitrasProps }) {

    const params = new URLSearchParams(window.location.search);
    const currentSort = params.get("sort");
    const order = params.get("order");

    const handleSort = (sort?: string) => {
        if (!sort) return;

        if (currentSort === sort && order === "asc") {
            params.delete("sort");
            params.delete("order");
            params.delete("page");
        } else if (currentSort === sort && order === "desc") {
            params.set("order", "asc");
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
                                        } className={`sortable uppercase font-bold text-black text-nowrap ${currentSort === header.sortKey ? '!bg-gray-200' : ''} ${header.className || ''}`}>
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
                        {mitras.data.length > 0 ? mitras.data.map(mitra => (
                            <TableRow className="odd:bg-[#FCFCFD] even:bg-white" key={mitra.id}>
                                <TableCell className="text-base min-w-[300px]">
                                    {mitra.image ? (
                                        <img src={`/storage/${mitra.image}`} alt="image" />
                                    ) : (
                                        <div className="w-[250px] h-32 rounded-md bg-neutral-400"></div>
                                    )}
                                </TableCell>
                                <TableCell className="text-base">
                                    {mitra.name}
                                </TableCell>
                                <TableCell className="text-base">
                                    {mitra.perusahaan}
                                </TableCell>
                                <TableCell className="text-base">
                                    {mitra.deskripsi}
                                </TableCell>
                                <TableCell className="text-base">
                                    {mitra.tgl_aktif ? format(mitra.tgl_aktif, 'dd MMMM y') : "-"}
                                </TableCell>
                                <TableCell>
                                    <Badge className={status[mitra.status] + ' text-nowrap'}>
                                        {mitra.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        asChild
                                        variant={"ghost"}
                                        className="px-2"
                                    >
                                        <Link href={`/admin/mitra/${mitra.id}`}>
                                            <Eye />
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow className="odd:bg-[#FCFCFD] even:bg-white">
                                <TableCell className="text-base text-center" colSpan={3}>Belum ada data mitra dibuat</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <div className="p-4 border-t space-y-3 lg:space-y-0 lg:flex lg:justify-between">
                    <TableSelectTotalPaginate data={mitras} />
                    <TablePagination data={mitras} />
                </div>
            </div>
        </div>
    );
}
