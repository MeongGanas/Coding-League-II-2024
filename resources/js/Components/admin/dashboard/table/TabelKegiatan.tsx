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
import { Eye, Pencil } from "lucide-react";
import { TablePagination } from "./TabelPagination";
import { Button } from "@/Components/ui/button";

export default function DataTableKegiatan() {
    return (
        <div className="w-full">
            <div className="bg-white rounded-md border">
                <Table className="overflow-x-auto">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="min-w-[2z00px] uppercase font-bold text-black">
                                Foto
                            </TableHead>
                            <TableHead className="uppercase font-bold text-black">
                                Judul
                            </TableHead>
                            <TableHead className="min-w-[200px] uppercase font-bold text-black">
                                Deskripsi
                            </TableHead>
                            <TableHead className="min-w-[200px] uppercase font-bold text-black">
                                Tgl Diterbitkan
                            </TableHead>
                            <TableHead className="uppercase font-bold text-black">
                                Status
                            </TableHead>
                            <TableHead className="uppercase font-bold text-black text-center">
                                Aksi
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="odd:bg-[#FCFCFD] even:bg-white">
                            <TableCell className="text-base min-w-[300px]">
                                <div className="w-[250px] h-32 rounded-md bg-neutral-400"></div>
                            </TableCell>
                            <TableCell className="text-base">
                                Pengadaan sarana keterampilan Olahan Pangan
                            </TableCell>
                            <TableCell className="text-base">
                                Vestibulum mauris tincidunt ultrices donec.
                                Egestas purus duis malesuada malesuada dictum
                                orci sapien.{" "}
                            </TableCell>
                            <TableCell className="text-base">
                                16 Juli 2024
                            </TableCell>
                            <TableCell>
                                <Badge className="text-success bg-success-bg hover:bg-success-bg">
                                    Terbit
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <div className="justify-center h-full flex items-center gap-1">
                                    <Button
                                        asChild
                                        variant={"ghost"}
                                        className="px-2"
                                    >
                                        <Link href={"/admin/kegiatan/1/detail"}>
                                            <Eye />
                                        </Link>
                                    </Button>
                                    <Button
                                        asChild
                                        variant={"ghost"}
                                        className="px-2"
                                    >
                                        <Link href={"/admin/kegiatan/1/edit"}>
                                            <Pencil className="w-5 h-5" />
                                        </Link>
                                    </Button>
                                </div>
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
