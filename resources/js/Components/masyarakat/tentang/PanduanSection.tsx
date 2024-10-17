import { Button } from "@/Components/ui/button";
import Garis from "../Garis";
import { Link } from "@inertiajs/react";

export default function PanduanSection() {
    return (
        <div className="bg-[#101828] px-5 py-20 relative text-white">
            <img src="/images/masyarakat/hiasan_3.png" width={150} alt="hiasan" className="absolute right-0 bottom-0" />
            <div className="container space-y-10">
                <div className="space-y-5 items-center flex flex-col">
                    <Garis />
                    <h1 className="font-extrabold text-3xl lg:text-4xl">Panduan</h1>
                    <p>Bagaimana proses CSR berlangsung</p>
                </div>
                <div className="flex flex-col space-y-10 items-center">
                    <div className="grid lg:grid-cols-3 space-y-8 lg:space-y-0">
                        <div className="flex flex-col items-center space-y-5">
                            <div className="relative w-full flex justify-center">
                                <div className="relative z-10 bg-primary rounded-md w-fit px-4 py-1.5 h-fit">
                                    <h1 className="font-bold text-2xl">1</h1>
                                </div>
                                <div className="w-1/2 absolute top-5 right-0 bg-white h-[2px] hidden lg:block"></div>
                            </div>
                            <div className="space-y-3 text-center px-5">
                                <h3 className="font-bold text-xl">Penyerahan Proposal CSR</h3>
                                <p>Pihak penerima menyerahkan proposal terkait CSR kepada Perusahaan yang akan di tuju. Jika perusahaan meminta rekomendasi Bupati Cirebon maka pihak penerima perlu membuat surat permohonan penerbitan surat rekomendasi CSR kepada Bupati dengan melampirkan dokumen proposal kegiatan.</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center space-y-5">
                            <div className="relative w-full flex justify-center">
                                <div className="w-1/2 hidden lg:block absolute top-5 left-0 bg-white h-[2px]"></div>
                                <div className="relative z-10 bg-primary rounded-md w-fit px-4 py-1.5 h-fit">
                                    <h1 className="font-bold text-2xl">2</h1>
                                </div>
                                <div className="w-1/2 absolute top-5 right-0 bg-white h-[2px] hidden lg:block"></div>
                            </div>
                            <div className="space-y-3 text-center px-5">
                                <h3 className="font-bold text-xl">Permohonan Penerbitan Surat CSR</h3>
                                <p>Permohonan penerbitan surat rekomendasi CSR yang sudah masuk akan di disposisikan kepada Bagian Perekonomian dan SDA untuk di tindak lanjuti.</p>
                                <p>Setelah Surat rekomendasi CSR di tandatangani Bupati maka pihak penerima perlu mengambil surat tersebut dan menyerahkan nya kepada perusahaan.</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center space-y-5">
                            <div className="relative w-full flex justify-center">
                                <div className="w-1/2 hidden lg:block absolute top-5 left-0 bg-white h-[2px]"></div>
                                <div className="relative z-10 bg-primary rounded-md w-fit px-4 py-1.5 h-fit">
                                    <h1 className="font-bold text-2xl">3</h1>
                                </div>
                            </div>
                            <div className="space-y-3 text-center px-5">
                                <h3 className="font-bold text-xl">Laporan CSR</h3>
                                <p>Setelah perusahaan menerima surat rekomendasi CSR maka selanjutnya pihak perusahaan berhubungan langsung dengan pihak penerima tanpa ada intervensi dari pemda, di akhir tahun berjalan perusahaan yang mengeluarkan CSR perlu melaporkan penyaluran CSR tersebut kepada Pemda sebagai laporan kepada Bupati.</p>
                            </div>
                        </div>
                    </div>
                    <Button asChild className="hover:bg-red-700"><Link href="/tentang/pengajuan">Ajukan surat rekomendasi CSR</Link></Button>
                </div>
            </div>
        </div>
    )
}