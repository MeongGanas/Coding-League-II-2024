import Garis from "../Garis";

export default function TujuanSection() {
    return (
        <div className="relative">
            <img src="/images/masyarakat/hiasan.png" width={100} alt="hiasan" className="absolute left-0 top-0" />
            <div className="container py-20 space-y-5 md:space-y-0 px-5 md:px-0">
                <div className="grid lg:grid-cols-2">
                    <div className="pr-10">
                        <img src="/images/masyarakat/tujuan.png" alt="tujuan" />
                    </div>
                    <div className="space-y-10 pl-5 pt-10">
                        <div className="space-y-5">
                            <Garis />
                            <h1 className="font-extrabold text-3xl lg:text-4xl">Tujuan</h1>
                        </div>
                        <p className="text-gray-600">
                            Maksud pemerintah kabupaten dalam Corporate Social Responsibility (CSR) adalah untuk menciptakan sinergi yang kuat antara pemerintah, perusahaan, dan masyarakat. Tujuan utama dari upaya ini adalah untuk mendorong pembangunan berkelanjutan di wilayah kabupaten. Dengan melibatkan perusahaan dalam program CSR, diharapkan dapat tercipta solusi komprehensif bagi berbagai permasalahan sosial dan lingkungan, sehingga kesejahteraan masyarakat dapat meningkat secara signifikan.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}