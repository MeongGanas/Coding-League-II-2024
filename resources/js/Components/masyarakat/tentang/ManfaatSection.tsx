import Garis from "../Garis";

export default function ManfaatSection() {
    return (
        <div className="py-20">
            <div className="relative">
                <div className="container space-y-5 md:space-y-0 px-5 md:px-0">
                    <div className="grid lg:grid-cols-2 md:h-[500px] items-center space-y-16 lg:space-y-0">
                        <div className="space-y-5 md:space-y-10 pl-5">
                            <div className="space-y-5">
                                <Garis />
                                <h1 className="font-extrabold text-3xl lg:text-4xl">Manfaat</h1>
                            </div>
                            <p className="text-gray-600 pl-3">
                                Pemerintah kabupaten memperoleh banyak manfaat dari pelaksanaan CSR. Salah satu manfaat utama adalah percepatan pembangunan di berbagai sektor. Dengan adanya dukungan dana dan sumber daya dari perusahaan, pemerintah dapat lebih cepat mewujudkan program-program pembangunan yang telah direncanakan, seperti pembangunan infrastruktur, peningkatan kualitas pendidikan dan kesehatan, serta pengembangan ekonomi masyarakat.
                            </p>
                        </div>
                        <div className="w-full h-full pl-5">
                            <div className="w-full h-full bg-slate-100 hidden xl:block"></div>
                            <img src="/images/masyarakat/manfaat.png" className="mx-auto xl:hidden" alt="manfaat" />
                        </div>
                        <img src="/images/masyarakat/manfaat.png" height={100} className="xl:absolute xl:right-0 xl:bottom-0 hidden xl:block" alt="manfaat" />
                    </div>
                </div>
            </div>
        </div>
    )
}