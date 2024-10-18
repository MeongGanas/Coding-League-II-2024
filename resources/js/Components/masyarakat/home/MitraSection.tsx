import Garis from "../Garis";

export default function MitraSection({mitras}: {mitras: any[]}) {
    const totalImages = 10;
    const defaultImage = "/images/masyarakat/default_mitra.png";

    return (
        <div className="relative">
            <img src="/images/masyarakat/hiasan.png" width={100} alt="hiasan" className="absolute rotate-90 right-0 top-0" />
            <div className="container py-20 space-y-5 px-5">
                <Garis />
                <h1 className="font-extrabold text-3xl lg:text-4xl">Mitra CSR <span className="block">Kabupaten Cirebon</span></h1>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    {
                        mitras.map((mitra, index) => (
                            <div key={index} className="w-full object-cover center border-item-mitra">
                                <img src={`/storage/${mitra.image}`} alt={mitra.nama} />
                            </div>
                        ))
                    }
                    {
                        Array.from({length: totalImages - mitras.length}, (_, index) => (
                            <div key={index} className="w-full object-cover center border-item-mitra">
                                <img src={defaultImage} alt="default" />
                            </div>
                        ))
                    }

                </div>
            </div>
        </div>
    )
}
