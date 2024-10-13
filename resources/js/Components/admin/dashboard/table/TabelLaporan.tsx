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
import { TablePagination } from "./TabelPagination";
import { Button } from "@/Components/ui/button";

export default function DataTableLaporan() {
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
                        <TableRow className="odd:bg-[#FCFCFD] even:bg-white">
                            <TableCell className="text-base min-w-[300px]">
                                Riverina name team to play Rabbitohs in Albur
                            </TableCell>
                            <TableCell className="text-base">
                                Facebook
                            </TableCell>
                            <TableCell className="text-base">
                                Kec. Karangwareng
                            </TableCell>
                            <TableCell className="text-base">
                                Rp.###,###,###
                            </TableCell>
                            <TableCell className="text-base">
                                1 Juli 2024
                            </TableCell>
                            <TableCell className="text-base">16 July</TableCell>
                            <TableCell>
                                <Badge className="text-success bg-success-bg hover:bg-success-bg">
                                    Diterima
                                </Badge>
                            </TableCell>
                            <TableCell className="text-base">
                                <Button
                                    asChild
                                    variant={"ghost"}
                                    className="px-2"
                                >
                                    <Link href={"/admin/laporan/1/detail"}>
                                        <Eye />
                                    </Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                {/* ikuti caraku yg di file TabelSektor */}

                {/* <div className="p-4 border-t space-y-3 lg:space-y-0 lg:flex lg:justify-between">
                    <TableSelectTotalPaginate />
                    <TablePagination />
                </div> */}
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
