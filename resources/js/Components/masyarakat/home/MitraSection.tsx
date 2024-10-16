import Garis from "../Garis";

export default function MitraSection() {
    return (
        <div className="relative">
            <img src="/images/masyarakat/hiasan.png" width={100} alt="hiasan" className="absolute rotate-90 right-0 top-0" />
            <div className="container py-20 space-y-5 px-5">
                <Garis />
                <h1 className="font-extrabold text-3xl lg:text-4xl">Mitra CSR <span className="block">Kabupaten Cirebon</span></h1>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    <img src="/images/masyarakat/Container (8).png" alt="mitra" className="w-full" />
                    <img src="/images/masyarakat/Container (1).png" alt="mitra" className="w-full" />
                    <img src="/images/masyarakat/Container (2).png" alt="mitra" className="w-full" />
                    <img src="/images/masyarakat/Container (3).png" alt="mitra" className="w-full" />
                    <img src="/images/masyarakat/Container (4).png" alt="mitra" className="w-full" />
                    <img src="/images/masyarakat/Container (5).png" alt="mitra" className="w-full" />
                    <img src="/images/masyarakat/Container (6).png" alt="mitra" className="w-full" />
                    <img src="/images/masyarakat/Container (7).png" alt="mitra" className="w-full" />
                    <img src="/images/masyarakat/Container (7).png" alt="mitra" className="w-full" />
                    <img src="/images/masyarakat/Container (7).png" alt="mitra" className="w-full" />
                </div>
            </div>
        </div>
    )
}