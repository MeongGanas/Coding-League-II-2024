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
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { KegiatanProps } from "@/types";

const statusColor = {
    "Terbit": "text-success bg-success-bg hover:bg-success-bg",
    "Draf": "text-warning bg-warning-bg hover:bg-warning-bg",
}

const tableHeader = [
    { title: "Foto", sortable: true, sortKey: "image", className: "min-w-[200px]" },
    { title: "Judul", sortable: true, sortKey: "name" },
    { title: "Deskripsi", sortable: true, sortKey: "deskripsi", className: "min-w-[200px]" },
    { title: "Tgl Diterbitkan", sortable: true, sortKey: "tgl_terbit", className: "min-w-[200px]" },
    { title: "Status", sortable: true, sortKey: "status" },
    { title: "Aksi", className: "text-center" },
]

export default function DataTableKegiatan({ kegiatans }: { kegiatans: KegiatanProps }) {

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
                        {kegiatans.data.length > 0 ? kegiatans.data.map((kegiatan) => (
                            <TableRow className="odd:bg-[#FCFCFD] even:bg-white" key={kegiatan.id}>
                                <TableCell className="text-base min-w-[300px]">
                                    {
                                        kegiatan.image ? (
                                            <img src={`/storage/${kegiatan.image}`} className="w-[250px] h-32 rounded-md" style={{ objectFit: 'cover' }}
                                                alt="kegiatan" />
                                        ) : (
                                            <div className="w-[250px] h-32 rounded-md bg-neutral-400"></div>
                                        )
                                    }
                                </TableCell>
                                <TableCell className="text-base">
                                    {kegiatan.name}
                                </TableCell>
                                <TableCell className="text-base">
                                    {kegiatan.deskripsi}
                                </TableCell>
                                <TableCell className="text-base">
                                    {
                                        kegiatan.tgl_terbit ? format(new Date(kegiatan.tgl_terbit), 'dd MMMM y', { locale: id }) : "-"
                                    }
                                </TableCell>
                                <TableCell>
                                    <Badge className={statusColor[kegiatan.status]}>
                                        {kegiatan.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="justify-center h-full flex items-center gap-1">
                                        <Button
                                            asChild
                                            variant={"ghost"}
                                            className="px-2"
                                        >
                                            <Link href={`/admin/kegiatan/${kegiatan.id}`}>
                                                <Eye />
                                            </Link>
                                        </Button>
                                        <Button
                                            asChild
                                            variant={"ghost"}
                                            className="px-2"
                                        >
                                            <Link href={`/admin/kegiatan/${kegiatan.id}/edit`}>
                                                <Pencil className="w-5 h-5" />
                                            </Link>
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow className="odd:bg-[#FCFCFD] even:bg-white">
                                <TableCell className="text-base text-center" colSpan={6}>Belum ada data kegiatan dibuat</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <div className="p-4 border-t space-y-3 lg:space-y-0 lg:flex lg:justify-between">
                    <TableSelectTotalPaginate data={kegiatans} />
                    <TablePagination data={kegiatans} />
                </div>
            </div>
        </div>
    );
}
