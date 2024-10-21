import Garis from "../Garis";

export default function ManfaatSection() {
    return (
        <div className="lg:py-20">
            <div className="relative">
                <div className="container space-y-5 md:space-y-0 px-5 md:px-0">
                    <div className="grid lg:grid-cols-2 items-center space-y-16 lg:space-y-0">
                        <div className="space-y-5  max-lg:h-full max-lg:mt-[150px]">
                            <div className="space-y-5">
                                <Garis />
                                <h1 className="font-extrabold text-3xl lg:text-4xl">Manfaat</h1>
                            </div>
                            <p className="text-gray-600 pl-3">
                                Pemerintah kabupaten memperoleh banyak manfaat dari pelaksanaan CSR. Salah satu manfaat utama adalah percepatan pembangunan di berbagai sektor. Dengan adanya dukungan dana dan sumber daya dari perusahaan, pemerintah dapat lebih cepat mewujudkan program-program pembangunan yang telah direncanakan, seperti pembangunan infrastruktur, peningkatan kualitas pendidikan dan kesehatan, serta pengembangan ekonomi masyarakat.
                            </p>
                        </div>
                        <div className="w-full h-full pl-5 mx-auto xl:hidden max-lg:order-first max-lg:flex justify-center ">
                            <img src="/images/masyarakat/manfaat.png" alt="manfaat" />
                        </div>
                        <div className="hidden md:h-[400px] xl:block">
                            <img src="/images/masyarakat/manfaat.png" height={100} className="xl:absolute xl:right-0 xl:bottom-0 manfaat-image max-h-[350px]" alt="manfaat" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
