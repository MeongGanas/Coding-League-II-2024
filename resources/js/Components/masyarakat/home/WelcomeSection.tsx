import { Link } from "@inertiajs/react";
import { Button } from "../../ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/Components/ui/carousel";

export default function WelcomeSection() {
    return (
        <div className="relative">
            <div className="py-10">
                <div className="w-1/2 bg-primary-darker absolute h-full top-0"></div>
                <div className="container">
                    <div className="bg-[url('/images/masyarakat/welcome.png')] bg-cover bg-no-repeat bg-center w-full h-screen xl:h-[600px] relative">
                        <div className="h-full w-full bg-black/60 absolute top-0 left-0 flex flex-col justify-center gap-5 px-5 md:px-10">
                            <div className="text-white space-y-2 w-full md:w-[500px]">
                                <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl capitalize">
                                    Selamat datang <span className="block">di portal CSR</span> Kab. Cirebon
                                </h1>
                                <p className="text-base sm:text-lg lg:text-xl text-light">
                                    Ketahui dan kenali customer social responsibility terhadap Kabupaten Cirebon dari <span className="font-bold">para Mitra</span>.
                                </p>
                            </div>
                            <NewsCarousel />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function NewsCarousel() {
    return (
        <Carousel className="bg-[#101828D9] py-10 px-12 xl:absolute text-white xl:w-[600px] xl:left-1/2 xl:-bottom-10">
            <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                        <div className="space-y-3">
                            <h1 className="text-lg md:text-2xl font-bold">Pemkab Cirebon Terima Bantuan PJU Tematik dari Bank BJB {index}</h1>
                            <Button asChild>
                                <Link href="/" className="uppercase hover:bg-red-700">jum'at, 12 jl 2024</Link>
                            </Button>
                            <p className="border-b-white">Penyerahan bantuan ini dihadiri langsung oleh Penjabat (Pj) Bupati Cirebon, Drs H Wahyu Mijaya SH MSi di Pendopo Bupati Cirebon, Jumat (12/7/2024). “Kami berterima kasih kepada Bank BJB yang telah memberikan PJU untuk dipasang di beberapa titik di wilayah Sumber, Kabupaten Cirebon,” ujar Wahyu. Ia menjelaskan, bahwa pemasangan PJU di kawasan Sumber, yang dekat dengan kantor pe...</p>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="text-white left-2 bg-transparent border-0 hover:bg-white/10 hover:text-white" />
            <CarouselNext className="text-white right-2 bg-transparent border-0 hover:bg-white/10 hover:text-white" />
        </Carousel>
    )
}