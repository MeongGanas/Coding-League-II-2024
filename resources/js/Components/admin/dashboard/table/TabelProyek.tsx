// TODO: jumlah mitra

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
import { ArrowDown, ArrowUp, Eye } from "lucide-react";
import { TablePagination, TableSelectTotalPaginate } from "./TabelPagination";
import { Button } from "@/Components/ui/button";
import { ProyekProps } from "@/types";
import { format } from "date-fns";
import { id } from 'date-fns/locale';

const tableHeader = [
    { title: "Judul", sortable: true, sortKey: "name", className: "min-w-[300px]" },
    { title: "Lokasi", sortable: true, sortKey: "kecamatan" },
    { title: "Jumlah Mitra", sortable: true, sortKey: "mitra" },
    { title: "tgl mulai", sortable: true, sortKey: "tgl_awal" },
    { title: "Tgl Akhir", sortable: true, sortKey: "tgl_akhir" },
    { title: "Tgl Diterbitkan", sortable: true, sortKey: "tgl_terbit" },
    { title: "Status", sortable: true, sortKey: "status" },
    { title: "Aksi", className: "text-center" },
]

export default function DataTableProyek({ proyeks }: { proyeks: ProyekProps }) {

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
                        {proyeks.data.length > 0 ? proyeks.data.map(proyek => (
                            <TableRow className="odd:bg-[#FCFCFD] even:bg-white" key={proyek.id}>
                                <TableCell className="text-base min-w-[300px]">
                                    {proyek.name}
                                </TableCell>
                                <TableCell className="text-base">
                                    {proyek.kecamatan}
                                </TableCell>
                                <TableCell className="text-base">
                                    {proyek.status === "Terbit" ? proyek.partisipasi.length : "-"}
                                </TableCell>
                                <TableCell className="text-base">
                                    {format(proyek.tgl_awal, 'dd MMMM y', { locale: id })}
                                </TableCell>
                                <TableCell className="text-base">
                                    {proyek.tgl_akhir ? format(proyek.tgl_akhir, 'dd MMMM y', { locale: id }) : "-"}
                                </TableCell>
                                <TableCell className="text-base">
                                    {proyek.tgl_terbit ? format(proyek.tgl_terbit, 'dd MMMM y', { locale: id }) : "-"}
                                </TableCell>
                                <TableCell>
                                    {proyek.status === "Terbit" ? (
                                        <Badge className="text-success bg-success-bg hover:bg-success-bg">
                                            Terbit
                                        </Badge>
                                    ) : (
                                        <Badge className="text-[#B54708] bg-[#FFFAEB] hover:bg-[#FFFAEB]">
                                            Draf
                                        </Badge>
                                    )}
                                </TableCell>
                                <TableCell className="text-base">
                                    <Button
                                        asChild
                                        variant={"ghost"}
                                        className="px-2"
                                    >
                                        <Link href={`/admin/proyek/${proyek.id}`}>
                                            <Eye />
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow className="odd:bg-[#FCFCFD] even:bg-white">
                                <TableCell className="text-base text-center" colSpan={7}>Belum ada data proyek dibuat</TableCell>
                            </TableRow>
                        )}

                    </TableBody>
                </Table>
                <div className="p-4 border-t space-y-3 lg:space-y-0 lg:flex lg:justify-between">
                    <TableSelectTotalPaginate data={proyeks} />
                    <TablePagination data={proyeks} />
                </div>
            </div>
        </div>
    );
}
