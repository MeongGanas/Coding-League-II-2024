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
import { Button } from "@/Components/ui/button";
import formatPrice from "@/lib/formatPrice";
import { id } from 'date-fns/locale';
import { format } from "date-fns";
import { LaporanProps } from "@/types";

const statusColor: { [key: string]: string } = {
    "Diterima": "text-success bg-success-bg hover:bg-success-bg",
    "Revisi": "text-warning bg-warning-bg hover:bg-warning-bg",
    "Draf": "text-netral bg-netral-bg hover:bg-netral-bg",
    "Ditolak": "text-error bg-error-bg hover:bg-error-bg",
}

const tableHeader = [
    { title: "Judul Laporan", sortable: true, sortKey: "name", className: "min-w-[300px]" },
    { title: "Lokasi", sortable: true, sortKey: "lokasi" },
    { title: "Realisasi", sortable: true, sortKey: "realisasi" },
    { title: "Tgl Realisasi", sortable: true, sortKey: "realisasi_date" },
    { title: "Laporan Dikirim", sortable: true, sortKey: "tgl_kirim" },
    { title: "Status", sortable: true, sortKey: "status" },
    { title: "Aksi", className: "text-center" },
]

export default function DataTableLaporanMitra({ laporans }: { laporans: LaporanProps }) {
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
                        {laporans.data.length > 0 ? laporans.data.map(laporan => (
                            <TableRow className="odd:bg-[#FCFCFD] even:bg-white" key={laporan.id}>
                                <TableCell className="text-base min-w-[300px]">
                                    {laporan.name}
                                </TableCell>
                                <TableCell className="text-base">
                                    {laporan.lokasi}
                                </TableCell>
                                <TableCell className="text-base text-nowrap">
                                    <span
                                        onClick={(e) => {
                                            e.currentTarget.textContent === "Rp ###,###,###"
                                                ? e.currentTarget.textContent = formatPrice(laporan.realisasi)
                                                : e.currentTarget.textContent = "Rp ###,###,###"
                                        }}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        Rp ###,###,###
                                    </span>
                                </TableCell>
                                {/* uncomment this if we're not supposed to have censored money amount */}
                                {/* <TableCell className="text-base text-nowrap">
                                     {formatPrice(laporan.realisasi)}
                                </TableCell> */}
                                <TableCell className="text-base">
                                    {
                                        format(
                                            new Date(laporan.realisasi_date),
                                            "d MMMM yyyy",
                                            { locale: id }
                                        )
                                    }
                                </TableCell>
                                <TableCell className="text-base">
                                    {
                                        format(
                                            new Date(laporan.tgl_kirim),
                                            "d MMMM yyyy",
                                            { locale: id }
                                        )
                                    }
                                </TableCell>
                                <TableCell>
                                    <Badge className={statusColor[laporan.status]}>
                                        {
                                            laporan.status
                                        }
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-base">
                                    <Button
                                        asChild
                                        variant={"ghost"}
                                        className="px-2"
                                    >
                                        <Link href={`/mitra/laporan/${laporan.id}`}>
                                            <Eye />
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow className="odd:bg-[#FCFCFD] even:bg-white">
                                <TableCell className="text-base text-center" colSpan={8}>Belum ada data laporan</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
