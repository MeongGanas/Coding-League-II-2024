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
import { Eye, Pencil } from "lucide-react";
import { TablePagination, TableSelectTotalPaginate } from "./TabelPagination";
import { Button } from "@/Components/ui/button";
import { SektorsProps } from "@/types";

export default function DataTableSektor({ sektors }: { sektors: SektorsProps }) {
    return (
        <div className="w-full">
            <div className="bg-white rounded-md border">
                <Table className="overflow-x-auto">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="uppercase font-bold text-black min-w-[200px]">
                                Nama Sektor
                            </TableHead>
                            <TableHead className="uppercase font-bold text-black">
                                Deskripsi Sektor
                            </TableHead>
                            <TableHead className="uppercase text-center font-bold text-black">
                                Aksi
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sektors.data ? sektors.data.map(sektor => (
                            <TableRow className="odd:bg-[#FCFCFD] even:bg-white" key={sektor.id}>
                                <TableCell className="text-base min-w-[200px]">{sektor.name}</TableCell>
                                <TableCell className="text-base">
                                    {sektor.deskripsi}
                                </TableCell>
                                <TableCell className="justify-center flex items-center gap-1">
                                    <Button
                                        asChild
                                        variant={"ghost"}
                                        className="px-2"
                                    >
                                        <Link href={`/admin/sektor/${sektor.id}`}>
                                            <Eye />
                                        </Link>
                                    </Button>
                                    <Button
                                        asChild
                                        variant={"ghost"}
                                        className="px-2"
                                    >
                                        <Link href={`/admin/sektor/${sektor.id}/edit`}>
                                            <Pencil className="w-5 h-5" />
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow className="odd:bg-[#FCFCFD] even:bg-white">
                                <TableCell className="text-base text-center" colSpan={3}>Belum ada data sektor dibuat</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <div className="p-4 border-t space-y-5 lg:space-y-0 lg:flex lg:justify-between">
                    <TableSelectTotalPaginate data={sektors} />
                    <TablePagination data={sektors} />
                </div>
            </div>
        </div>
    );
}
