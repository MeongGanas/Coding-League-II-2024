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
import { ArrowBigDown, ArrowDown, ArrowUp, Eye } from "lucide-react";
import { TablePagination, TableSelectTotalPaginate } from "./TabelPagination";
import { Button } from "@/Components/ui/button";
import formatPrice from "@/lib/formatPrice";
import { id } from 'date-fns/locale';
import { format } from "date-fns";
import { LaporanProps } from "@/types";
import { useState } from "react";

const statusColor: { [key: string]: string } = {
    "Diterima": "text-success bg-success-bg hover:bg-success-bg",
    "Revisi": "text-warning bg-warning-bg hover:bg-warning-bg",
    "Draf": "text-netral bg-netral-bg hover:bg-netral-bg",
}

const tableHeader = [
    {title: "Judul Laporan", sortable: true, sortKey: "name"},
    {title: "Mitra", sortable: true, sortKey: "mitra", isRelation: true, relationKey: "name"},
    {title: "Lokasi", sortable: true, sortKey: "lokasi"},
    {title: "Realisasi", sortable: true, sortKey: "realisasi"},
    {title: "Tgl Realisasi", sortable: true, sortKey: "realisasi_date"},
    {title: "Laporan Dikirim", sortable: true, sortKey: "tgl_kirim"},
    {title: "Status", sortable: true, sortKey: "status"},
    {title: "Aksi", sortable: false}
]

export default function DataTableLaporan({ laporans }: { laporans: LaporanProps }) {
    console.log(laporans);

    const params = new URLSearchParams(window.location.search);
    const currentSort = params.get("sort");
    const isAscending = params.get("isAscending");

    const handleSort = (sort?: string) => {
        if (!sort) return;

        if (currentSort === sort && isAscending === "true") {
            params.delete("sort");
            params.delete("isAscending");
            params.delete("page");
            params.delete("with");
        } else if (currentSort === sort && isAscending === "false") {
            params.set("isAscending", "true" );
        } else {
            params.set("sort", sort);
            params.set("isAscending", "false");
            params.delete("page");
            if (tableHeader.find(header => header.sortKey === sort)?.isRelation) {
                params.set("with", tableHeader.find(header => header.sortKey === sort)?.relationKey as string);
            }
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
                        {/* <TableRow className="tablerow">
                            <TableHead onClick={
                                () => handleSort("name")
                            } className={`sortable min-w-[300px] uppercase font-bold text-black ${currentSort === 'name' ? '!bg-gray-200' : ''}`}>
                                Judul Laporan {
                                    isAscending === "true"
                                        ? <ArrowUp className="w-4 h-4 ml-1 rounded-md inline" />
                                        : <ArrowDown className="w-4 h-4 ml-1 rounded-md inline" />
                                }
                            </TableHead>
                            <TableHead onClick={
                                () => handleSort("mitra.name")
                            } className={`sortable uppercase font-bold text-black text-nowrap ${currentSort === 'mitra.name' ? '!bg-gray-200' : ''}`}>
                                Mitra {
                                    isAscending === "true"
                                        ? <ArrowUp className="w-4 h-4 ml-1 rounded-md inline" />
                                        : <ArrowDown className="w-4 h-4 ml-1 rounded-md inline" />
                                }
                            </TableHead>
                            <TableHead onClick={
                                () => handleSort("lokasi")
                            } className="sortable uppercase font-bold text-black text-nowrap">
                                Lokasi <ArrowDown className="w-4 h-4 ml-1 rounded-md inline"  />
                            </TableHead>
                            <TableHead onClick={
                                () => handleSort("realisasi")
                            } className="sortable uppercase font-bold text-black text-nowrap">
                                Realisasi <ArrowDown className="w-4 h-4 ml-1 rounded-md inline"  />
                            </TableHead>
                            <TableHead onClick={
                                () => handleSort("realisasi_date")
                            } className="sortable uppercase font-bold text-black text-nowrap">
                                Tgl Realisasi <ArrowDown className="w-4 h-4 ml-1 rounded-md inline"  />
                            </TableHead>
                            <TableHead onClick={
                                () => handleSort("tgl_kirim")
                            } className="sortable uppercase font-bold text-black text-nowrap">
                                Laporan Dikirim <ArrowDown className="w-4 h-4 ml-1 rounded-md inline"  />
                            </TableHead>
                            <TableHead onClick={
                                () => handleSort("status")
                            } className="sortable uppercase font-bold text-black text-nowrap">
                                Status <ArrowDown className="w-4 h-4 ml-1 rounded-md inline"  />
                            </TableHead>
                            <TableHead className=" uppercase font-bold text-black text-nowrap">
                                Aksi
                            </TableHead>
                        </TableRow> */}
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
                                    } className={`sortable uppercase font-bold text-black text-nowrap ${currentSort === header.sortKey ? '!bg-gray-200' : ''}`}>
                                        {header.title} {
                                            isAscending === "true"
                                                ? <ArrowUp className="w-4 h-4 ml-1 rounded-md inline" />
                                                : <ArrowDown className="w-4 h-4 ml-1 rounded-md inline" />
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
                                    {laporan.mitra.name}
                                </TableCell>
                                <TableCell className="text-base">
                                    {laporan.lokasi}
                                </TableCell>
                                <TableCell className="text-base">
                                    <span
                                        onClick={(e) => {
                                            e.currentTarget.innerText = formatPrice(laporan.realisasi);
                                        }}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        Rp ###,###,###
                                    </span>
                                </TableCell>
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
                                        <Link href={`/admin/laporan/${laporan.id}`}>
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
                <div className="p-4 border-t space-y-3 lg:space-y-0 lg:flex lg:justify-between">
                    <TableSelectTotalPaginate data={laporans} />
                    <TablePagination data={laporans} />
                </div>
            </div>
        </div>
    );
}
