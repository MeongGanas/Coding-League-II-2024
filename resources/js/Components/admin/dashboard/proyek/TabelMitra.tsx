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

export default function DataTableMitra() {
    return (
        <div className="w-full">
            <div className="bg-white rounded-md border">
                <Table className="overflow-x-auto">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="uppercase font-bold text-black">
                                Nama Mitra
                            </TableHead>
                            <TableHead className="uppercase font-bold text-black">
                                Email
                            </TableHead>
                            <TableHead className="uppercase font-bold text-black">
                                No. Telepon
                            </TableHead>
                            <TableHead className="uppercase font-bold text-black">
                                tgl mulai
                            </TableHead>
                            <TableHead className="uppercase font-bold text-black">
                                Aksi
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="odd:bg-[#FCFCFD] even:bg-white">
                            <TableCell className="text-base">
                                GITS Indonesia
                            </TableCell>
                            <TableCell className="text-base">
                                info@gits.id
                            </TableCell>
                            <TableCell className="text-base">
                                022 677 ####
                            </TableCell>
                            <TableCell className="text-base">
                                1 Juli 2024
                            </TableCell>
                            <TableCell className="text-base">
                                <Link href={"/admin/proyek/1/detail"}>
                                    <Eye />
                                </Link>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
