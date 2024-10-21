import Garis from "@/Components/masyarakat/Garis";
import OtherWelcomeSection from "@/Components/masyarakat/OtherWelcomeSection";
import ProyekListSection from "@/Components/masyarakat/sektor/ProyekListSection";
import { Button } from "@/Components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/Components/ui/table";
import LayoutMasyarakat from "@/Layouts/LayoutMasyarakat";
import { PageProps, Sektor } from "@/types";
import { Link } from "@inertiajs/react";
import { Eye } from "lucide-react";

export default function DetailSektor({ auth: { user }, sektor }: PageProps<{ sektor: Sektor }>) {
    return (
        <LayoutMasyarakat user={user} title="Sektor Detail">
            <OtherWelcomeSection title={sektor.name} desc={"Program CSR yang sudah berjalan di kabupaten cirebon"} pagePath={sektor.name} />
            <div className="relative">
                <img src="/images/masyarakat/hiasan.png" width={150} alt="hiasan" className="absolute rotate-90 -z-10 right-0 top-0" />
                <div className="container px-5 pt-20 pb-10 space-y-5">
                    <Garis />
                    <p className="text-gray-600">{sektor.deskripsi}</p>
                </div>
            </div>


            <div className="relative">
                <img src="/images/masyarakat/hiasan.png" width={150} alt="hiasan" className="absolute rotate-180 -z-10 left-0 bottom-0" />
                <div className="container px-5 py-20 space-y-5">
                    <div className="space-y-5">
                        <Garis />
                        <h1 className="font-extrabold text-3xl lg:text-4xl">Proyek CSR</h1>
                        <p className="text-gray-600">Proyek CSR Kabupaten Cirebon yang tersedia</p>
                    </div>
                    <Table className="scroll-hidden">
                        <TableBody className="overflow-auto">
                            {sektor.proyeks ? sektor.proyeks.map((proyek) => (
                                <TableRow className="odd:bg-[#FCFCFD] even:bg-white" key={proyek.id}>
                                    <TableCell className="font-medium min-w-96">{proyek.name}</TableCell>
                                    <TableCell className="min-w-52">{proyek.kecamatan}</TableCell>
                                    <TableCell className="text-end"><Button asChild className="hover:bg-red-700"><Link href={`/program/${proyek.id}/proyek`} className="flex items-center gap-2"><Eye className="w-5 h-5" /><span>Lihat Detail</span></Link></Button></TableCell>
                                </TableRow>
                            )) : (
                                <TableRow className="odd:bg-[#FCFCFD] even:bg-white">=
                                    <TableCell colSpan={3}>Belum ada proyek tersedia</TableCell>=
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </LayoutMasyarakat>
    )
}
