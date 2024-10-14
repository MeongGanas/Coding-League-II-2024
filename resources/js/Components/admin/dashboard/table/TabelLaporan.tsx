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
import { Eye } from "lucide-react";
import { TablePagination, TableSelectTotalPaginate } from "./TabelPagination";
import { Button } from "@/Components/ui/button";
import formatPrice from "@/lib/formatPrice";
import { id } from 'date-fns/locale';
import { format } from "date-fns";

const statusColor = {
    "Diterima": "text-success bg-success-bg hover:bg-success-bg",
    "Revisi": "text-warning bg-warning-bg hover:bg-warning-bg",
    "Draf": "text-netral bg-netral-bg hover:bg-netral-bg",
}

export default function DataTableLaporan({ laporans }: any) {
    console.log(laporans);

    return (
        <div className="w-full">
            <div className="bg-white rounded-md border">
                <Table className="overflow-x-auto">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="min-w-[300px] uppercase font-bold text-black">
                                Judul Laporan
                            </TableHead>
                            <TableHead className="uppercase font-bold text-black">
                                Mitra
                            </TableHead>
                            <TableHead className="uppercase font-bold text-black">
                                Lokasi
                            </TableHead>
                            <TableHead className="uppercase font-bold text-black">
                                Realisasi
                            </TableHead>
                            <TableHead className="uppercase font-bold text-black">
                                Tgl Realisasi
                            </TableHead>
                            <TableHead className="uppercase font-bold text-black">
                                Laporan Dikirim
                            </TableHead>
                            <TableHead className="uppercase font-bold text-black">
                                Status
                            </TableHead>
                            <TableHead className="uppercase font-bold text-black">
                                Aksi
                            </TableHead>
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
                                <Badge className={ statusColor[laporan.status] }>
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
                {/* ikuti caraku yg di file TabelSektor */}

                <div className="p-4 border-t space-y-3 lg:space-y-0 lg:flex lg:justify-between">
                    <TableSelectTotalPaginate data={laporans} />
                    <TablePagination data={laporans} />
                </div>
            </div>
        </div>
    );
}

{
    /* <Badge className="text-[#B54708] bg-[#FFFAEB] hover:bg-[#FFFAEB]">
                                    Revisi
                                </Badge> */
}
{
    /* <Badge className="text-[#344054] bg-[#F2F4F7] hover:bg-[#F2F4F7]">
                                    Draf
                                </Badge> */
}
