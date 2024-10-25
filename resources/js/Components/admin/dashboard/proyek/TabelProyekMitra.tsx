import { Button } from "@/Components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Proyek } from "@/types";
import { Link } from "@inertiajs/react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Eye } from "lucide-react";

export default function DataTableProyekMitra({ proyek }: { proyek: Proyek }) {
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
                    <TableBody className="overflow-auto">
                        {proyek.partisipasi.length > 0 ? proyek.partisipasi.map((partisipasi) => {
                            const punyaLaporan = (partisipasi?.mitra?.laporan?.length ?? 0) > 0;

                            return (
                                <TableRow className="bg-[#FCFCFD]" key={partisipasi.id}>
                                    <TableCell className="font-medium min-w-52">{partisipasi.mitra.name}</TableCell>
                                    <TableCell className="font-medium min-w-52">{partisipasi.mitra.email}</TableCell>
                                    <TableCell className="font-medium min-w-52">{partisipasi.mitra.no_telepon}</TableCell>
                                    <TableCell className="min-w-52">
                                        {partisipasi.created_at ? format(new Date(partisipasi.created_at), 'dd MMM y', { locale: id }) : "-"}
                                    </TableCell>
                                    <TableCell>
                                        {punyaLaporan ? (
                                            <Button asChild variant={"ghost"} size={"icon"}>
                                                <Link
                                                    href={`/laporan/${partisipasi.mitra.laporan?.[0].id}/detail`}
                                                    className="flex items-center gap-2"
                                                >
                                                    <Eye className="w-5 h-5" />
                                                </Link>
                                            </Button>
                                        ) : (
                                            <h1>Belum ada laporan</h1>
                                        )}

                                    </TableCell>
                                </TableRow>
                            );
                        }) : (
                            // TODO real kh ini?? knp proyek skira mitra
                            <TableRow className="odd:bg-[#FCFCFD] even:bg-white">=
                                <TableCell colSpan={5}>Belum ada proyek tersedia</TableCell>=
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
