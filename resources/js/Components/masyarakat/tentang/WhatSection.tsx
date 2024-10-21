import Garis from "../Garis";

export default function WhatSection() {
    return (
        <div className="relative">
            <img src="/images/masyarakat/hiasan.png" width={100} alt="hiasan" className="absolute right-0 top-0 scale-y-[-1]" />
            <div className="container pt-20 pb-10 lg:py-20 space-y-5 px-5">
                <div className="grid lg:grid-cols-2 space-y-5 md:space-y-0">
                    <div className="space-y-5 max-lg:mb-5">
                        <Garis />
                        <h1 className="font-extrabold text-3xl lg:text-4xl">Apa Itu<span className="block">Kegiatan CSR?</span></h1>
                    </div>
                    <p className="text-gray-600">
                        Corporate Social Responsibility (CSR) merupakan konsep di mana perusahaan secara sadar mengintegrasikan kepedulian sosial dan lingkungan ke dalam operasional bisnisnya. Ini melibatkan tindakan sukarela yang memberikan manfaat bagi masyarakat, seperti program pendidikan, kesehatan, dan lingkungan, serta upaya untuk mengurangi dampak negatif terhadap lingkungan. CSR tidak hanya mencerminkan tanggung jawab perusahaan terhadap masyarakat, tetapi juga dapat meningkatkan reputasi dan daya saing bisnis.
                    </p>
                </div>
                <p className="text-gray-600">
                    Berdasarkan Undang-Undang nomor 40  Tahun 2007 tentang Perseroan Terbatas (UUPT) pasal 1 ayat 3, pengertian Tanggung Jawab Sosial dan Lingkungan Perusahaan (TJSLP) atau Corporate Social Responsibility (CSR) adalah komitmen perseroan untuk berperan serta dalam pembangunan ekonomi berkelanjutan guna meningkatkan kualitas kehidupan dan lingkungan yang bermanfaat, baik bagi perseroan sendiri, komunitas setempat, maupun masyarakat pada umumnya.
                </p>
            </div>
        </div>
    )
}
