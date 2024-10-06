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
import TablePagination from "./TabelPagination";
import { Button } from "@/Components/ui/button";

export default function DataTableSektor() {
    return (
        <div className="w-full">
            <div className="bg-white rounded-md border">
                <Table className="overflow-x-auto">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="uppercase font-bold text-black">
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
                        <TableRow className="odd:bg-[#FCFCFD] even:bg-white">
                            <TableCell className="text-base">Sosial</TableCell>
                            <TableCell className="text-base min-w-[300px]">
                                Vestibulum mauris tincidunt ultrices donec.
                                Egestas purus duis malesuada malesuada dictum
                                orci sapien.
                            </TableCell>
                            <TableCell className="justify-center flex items-center gap-1">
                                <Button
                                    asChild
                                    variant={"ghost"}
                                    className="px-2"
                                >
                                    <Link href={"/admin/sektor/1/detail"}>
                                        <Eye />
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    variant={"ghost"}
                                    className="px-2"
                                >
                                    <Link href={"/admin/sektor/1/edit"}>
                                        <Pencil className="w-5 h-5" />
                                    </Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <div className="p-4 border-t space-y-3 lg:space-y-0 lg:flex lg:justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-neutral-600 font-bold">
                            Tampilankan Data
                        </h1>
                        <Select>
                            <SelectTrigger className="w-14">
                                <SelectValue placeholder="5" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="5">5</SelectItem>
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="15">15</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <h1 className="text-neutral-600 font-bold">
                            1-5 data dari 10 data.
                        </h1>
                    </div>
                    <TablePagination />
                </div>
            </div>
        </div>
    );
}
