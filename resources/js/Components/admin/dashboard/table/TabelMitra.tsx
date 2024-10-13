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

export default function DataTableMitra() {
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
                                Nama
                            </TableHead>
                            <TableHead className="min-w-[200px] uppercase font-bold text-black">
                                Nama PT
                            </TableHead>
                            <TableHead className="min-w-[200px] uppercase font-bold text-black">
                                Deskripsi
                            </TableHead>
                            <TableHead className="min-w-[200px] uppercase font-bold text-black">
                                Tgl terdaftar
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
                                Mitra Sejahtera
                            </TableCell>
                            <TableCell className="text-base">
                                PT Mitra Sejahtera Selalu
                            </TableCell>
                            <TableCell className="text-base">
                                Vestibulum mauris tincidunt ultrices donec.
                            </TableCell>
                            <TableCell className="text-base">
                                16 Juli 2024
                            </TableCell>
                            <TableCell>
                                <Badge className="text-success bg-success-bg hover:bg-success-bg">
                                    Aktif
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Button
                                    asChild
                                    variant={"ghost"}
                                    className="px-2"
                                >
                                    <Link href={"/admin/mitra/1/detail"}>
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
