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
import { Eye } from "lucide-react";
import { TablePagination, TableSelectTotalPaginate } from "./TabelPagination";
import { Button } from "@/Components/ui/button";
import { ProyekProps } from "@/types";
import { format } from "date-fns";
import { id } from 'date-fns/locale';

export default function DataTableProyek({ proyeks }: { proyeks: ProyekProps }) {
    console.log(proyeks)
    return (
        <div className="w-full">
            <div className="bg-white rounded-md border">
                <Table className="overflow-x-auto">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="min-w-[300px] uppercase font-bold text-black">
                                Judul
                            </TableHead>
                            <TableHead className="uppercase font-bold text-black">
                                Lokasi
                            </TableHead>
                            <TableHead className="uppercase font-bold text-black">
                                Jumlah Mitra
                            </TableHead>
                            <TableHead className="uppercase font-bold text-black">
                                tgl mulai
                            </TableHead>
                            <TableHead className="uppercase font-bold text-black">
                                Tgl Diterbitkan
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
                        {proyeks.data.length > 0 ? proyeks.data.map(proyek => (
                            <TableRow className="odd:bg-[#FCFCFD] even:bg-white" key={proyek.id}>
                                <TableCell className="text-base min-w-[300px]">
                                    {proyek.name}
                                </TableCell>
                                <TableCell className="text-base">
                                    {proyek.kecamatan}
                                </TableCell>
                                <TableCell className="text-base">10</TableCell>
                                <TableCell className="text-base">
                                    {format(proyek.tgl_awal, 'dd MMMM y', { locale: id })}
                                </TableCell>
                                <TableCell className="text-base">
                                    {proyek.tgl_akhir ? format(proyek.tgl_akhir, 'dd MMMM y', { locale: id }) : "-"}
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
