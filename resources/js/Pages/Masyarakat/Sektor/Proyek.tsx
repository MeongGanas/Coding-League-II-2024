import Garis from "@/Components/masyarakat/Garis";
import OtherWelcomeSection from "@/Components/masyarakat/OtherWelcomeSection";
import { Button } from "@/Components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import LayoutMasyarakat from "@/Layouts/LayoutMasyarakat";
import { toCapitalize } from "@/lib/toCapitalize";
import { PageProps, Partisipasi, Proyek } from "@/types";
import { Link } from "@inertiajs/react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Eye } from "lucide-react";

export default function DetailSektorProyek({
    auth: { user },
    proyek,
    partisipasi,
}: PageProps<{ proyek: Proyek; partisipasi: Partisipasi[]; gallery: any }>) {
    const laporanPhotos = proyek.sektor.laporans.flatMap(
        (laporan) => laporan.photos
    );

    console.log(partisipasi)

    return (
        <LayoutMasyarakat user={user} title="Sektor Proyek">
            <OtherWelcomeSection
                title={proyek.name}
                desc={`Mulai: ${format(
                    new Date(proyek.tgl_awal),
                    "MMMM dd, y"
                )} -  Tgl. Berakhir: ${proyek.tgl_akhir
                    ? format(new Date(proyek.tgl_akhir), "MMMM dd, y")
                    : "-"
                    }`}
                addBreadCrumb={proyek.sektor.name}
                addBreadCrumbID={proyek.sektor_id.toString()}
                anotherDesc={
                    <p className="lg:text-lg text-light">Kec. {toCapitalize(proyek.kecamatan)}</p>
                }
            />

            <div className="relative">
                <img
                    src="/images/masyarakat/hiasan.png"
                    width={150}
                    alt="hiasan"
                    className="absolute rotate-90 -z-10 right-0 top-0"
                />
                <div className="container px-5 pt-20 pb-10 space-y-5">
                    <Garis />
                    <h1 className="font-extrabold text-3xl lg:text-4xl">
                        Deskripsi Proyek
                    </h1>
                    <p className="text-gray-600">{proyek.deskripsi}</p>
                </div>
            </div>

            <div className="container px-5 space-y-10">
                <h2 className="font-extrabold text-2xl lg:text-3xl">Galeri</h2>
                {
                    laporanPhotos.length > 0 ? (
                        <div className="flex w-full overflow-auto gap-5 scroll-hidden">
                            {laporanPhotos.map((photo: any, i: number) => (
                                <img
                                    src={`/storage/${photo}`}
                                    key={i}
                                    width={300}
                                    alt="example"
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                            <h1>Belum ada galeri</h1>
                        </div>
                    )
                }
            </div>

            <div className="relative">
                <img
                    src="/images/masyarakat/hiasan.png"
                    width={150}
                    alt="hiasan"
                    className="absolute rotate-180 -z-10 left-0 bottom-0"
                />
                <div className="container px-5 py-20 space-y-10">
                    <h1 className="font-extrabold text-3xl lg:text-4xl">
                        Mitra yang berpartisipasi
                    </h1>
                    <Table className="scroll-hidden border">
                        <TableHeader>
                            <TableRow className="bg-[#F2F4F7]">
                                <TableHead className="uppercase">
                                    nama mitra
                                </TableHead>
                                <TableHead className="uppercase">
                                    email
                                </TableHead>
                                <TableHead className="uppercase">
                                    no. telepon
                                </TableHead>
                                <TableHead className="uppercase">
                                    tgl pengajuan
                                </TableHead>
                                <TableHead className="uppercase">
                                    aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="overflow-auto">
                            {partisipasi.length > 0 ? (
                                partisipasi.map((partisipasi) => {
                                    const punyaLaporan =
                                        (partisipasi?.mitra?.laporan?.length ??
                                            0) > 0;

                                    return (
                                        <TableRow
                                            className="bg-[#FCFCFD]"
                                            key={partisipasi.id}
                                        >
                                            <TableCell className="font-medium min-w-52">
                                                {partisipasi.mitra.name}
                                            </TableCell>
                                            <TableCell className="font-medium min-w-52">
                                                {partisipasi.mitra.email}
                                            </TableCell>
                                            <TableCell className="font-medium min-w-52">
                                                {partisipasi.mitra.no_telepon}
                                            </TableCell>
                                            <TableCell className="min-w-52">
                                                {partisipasi.created_at
                                                    ? format(
                                                        new Date(
                                                            partisipasi.created_at
                                                        ),
                                                        "dd MMM y",
                                                        { locale: id }
                                                    )
                                                    : "-"}
                                            </TableCell>
                                            <TableCell>
                                                {punyaLaporan ? (
                                                    <Button
                                                        asChild
                                                        className="hover:bg-red-700"
                                                    >
                                                        <Link
                                                            href={
                                                                punyaLaporan
                                                                    ? `/laporan/${partisipasi.mitra.laporan?.[0].id}/detail`
                                                                    : "#"
                                                            }
                                                            className="flex items-center gap-2"
                                                        >
                                                            <Eye className="w-5 h-5" />
                                                            <span>
                                                                Lihat Laporan
                                                            </span>
                                                        </Link>
                                                    </Button>
                                                ) : (
                                                    <h1>Belum ada laporan</h1>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            ) : (
                                <TableRow className="odd:bg-[#FCFCFD] even:bg-white">
                                    <TableCell colSpan={5} className="text-center">
                                        Belum ada yang partisipasi
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </LayoutMasyarakat>
    );
}
