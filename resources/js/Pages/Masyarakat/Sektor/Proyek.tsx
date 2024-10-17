import Garis from "@/Components/masyarakat/Garis";
import OtherWelcomeSection from "@/Components/masyarakat/OtherWelcomeSection";
import { Button } from "@/Components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import LayoutMasyarakat from "@/Layouts/LayoutMasyarakat";
import { PageProps, Proyek, Sektor } from "@/types";
import { Link } from "@inertiajs/react";
import { format } from "date-fns";
import { Eye } from "lucide-react";

export default function DetailSektorProyek({ auth: { user }, proyek }: PageProps<{ proyek: Proyek }>) {
    console.log(proyek)
    return (
        <LayoutMasyarakat user={user} title="Sektor Proyek">
            <OtherWelcomeSection title={proyek.name} desc={`Mulai: ${format(new Date(proyek.tgl_awal), 'MMMM dd, y')} -  Tgl. Berakhir: ${proyek.tgl_akhir ? format(new Date(proyek.tgl_akhir), 'MMMM dd, y') : "-"}`} addBreadCrumb={proyek.sektor.name} addBreadCrumbID={proyek.sektor_id.toString()} />

            <div className="relative">
                <img src="/images/masyarakat/hiasan.png" width={150} alt="hiasan" className="absolute rotate-90 -z-10 right-0 top-0" />
                <div className="container px-5 pt-20 pb-10 space-y-5">
                    <Garis />
                    <h1 className="font-extrabold text-3xl lg:text-4xl">Deskripsi Proyek</h1>
                    <p className="text-gray-600">{proyek.deskripsi}</p>
                </div>
            </div>

            <div className="container px-5 space-y-10">
                <h2 className="font-extrabold text-2xl lg:text-3xl">Galeri</h2>
                <div className="flex w-full overflow-auto gap-5 scroll-hidden">
                    <img src="/storage/example.jpg" width={300} alt="example" />
                    <img src="/storage/example.jpg" width={300} alt="example" />
                    <img src="/storage/example.jpg" width={300} alt="example" />
                    <img src="/storage/example.jpg" width={300} alt="example" />
                </div>
            </div>

            <div className="relative">
                <img src="/images/masyarakat/hiasan.png" width={150} alt="hiasan" className="absolute rotate-180 -z-10 left-0 bottom-0" />
                <div className="container px-5 py-20 space-y-10">
                    <h1 className="font-extrabold text-3xl lg:text-4xl">Mitra yang berpartisipasi</h1>
                    <Table className="scroll-hidden border">
                        <TableHeader>
                            <TableRow className="bg-[#F2F4F7]">
                                <TableHead className="uppercase">nama mitra</TableHead>
                                <TableHead className="uppercase">email</TableHead>
                                <TableHead className="uppercase">no. telepon</TableHead>
                                <TableHead className="uppercase">tgl pengajuan</TableHead>
                                <TableHead className="uppercase">aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="overflow-auto">
                            <TableRow className="bg-[#FCFCFD]">
                                <TableCell className="font-medium min-w-52">GTIS Indonesia</TableCell>
                                <TableCell className="font-medium min-w-52">info@gmail.com</TableCell>
                                <TableCell className="font-medium min-w-52">022 677 ####</TableCell>
                                <TableCell className="min-w-52">1 Juli 2024</TableCell>
                                <TableCell><Button asChild className="hover:bg-red-700"><Link href={`/laporan/1/detail`} className="flex items-center gap-2"><Eye className="w-5 h-5" /><span>Lihat Laporan</span></Link></Button></TableCell>
                            </TableRow>
                            {/* <TableRow className="odd:bg-[#FCFCFD] even:bg-white">=
                                    <TableCell colSpan={3}>Belum ada proyek tersedia</TableCell>=
                                </TableRow> */}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </LayoutMasyarakat>
    )
}