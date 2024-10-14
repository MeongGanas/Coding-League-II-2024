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
import { TablePagination, TableSelectTotalPaginate } from "./TabelPagination";
import { Button } from "@/Components/ui/button";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const statusColor = {
    "Terbit": "text-success bg-success-bg hover:bg-success-bg",
    "Draf": "text-warning bg-warning-bg hover:bg-warning-bg",
}

export default function DataTableKegiatan({kegiatans}: any) {

    console.log(kegiatans);
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
                        {kegiatans.data.length > 0 ? kegiatans.data.map((kegiatan: any) => (
// created_at: "2024-10-14T16:13:01.000000Z"
// ​​​
// deskripsi: "Ut ratione est accusantium labore. Ad tempore beatae et sunt ab incidunt dicta sed."
// ​​​
// id: 1
// ​​​
// image: "example.jpg"
// ​​​
// name: "Accusantium ut minima in possimus."
// ​​​
// rincian: "Id ex illum sed. Veniam pariatur inventore ratione natus non ut magnam. Autem hic fuga est ipsam qui."
// ​​​
// status: "Draf"
// ​​​

                        <TableRow className="odd:bg-[#FCFCFD] even:bg-white" key={kegiatan.id}>
                        <TableCell className="text-base min-w-[300px]">
                            {
                                kegiatan.image ? (
                                    <img src={`/storage/${kegiatan.image}`} className="w-[250px] h-32 rounded-md" style={{objectFit: 'cover'}}
                                     alt="kegiatan" />
                                ) : (
                                    <div className="w-[250px] h-32 rounded-md bg-neutral-400"></div>
                                )
                            }
                        </TableCell>
                        <TableCell className="text-base">
                            {kegiatan.name}
                        </TableCell>
                        <TableCell className="text-base">
                            {kegiatan.deskripsi}
                        </TableCell>
                        <TableCell className="text-base">
                            {
                                kegiatan.tgl_terbit ? format(new Date(kegiatan.tgl_terbit), 'dd MMMM y', { locale: id }) : "-"
                            }
                        </TableCell>
                        <TableCell>
                            <Badge className={statusColor[kegiatan.status]}>
                                {kegiatan.status}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            <div className="justify-center h-full flex items-center gap-1">
                                <Button
                                    asChild
                                    variant={"ghost"}
                                    className="px-2"
                                >
                                    <Link href={`/admin/kegiatan/${kegiatan.id}`}>
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
                        )) : (
                            <TableRow className="odd:bg-[#FCFCFD] even:bg-white">
                                <TableCell className="text-base text-center" colSpan={6}>Belum ada data kegiatan dibuat</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <div className="p-4 border-t space-y-3 lg:space-y-0 lg:flex lg:justify-between">
                    <TableSelectTotalPaginate data={kegiatans} />
                    <TablePagination data={kegiatans} />
                </div>
            </div>
        </div>
    );
}
