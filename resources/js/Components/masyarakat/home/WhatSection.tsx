import Garis from "../Garis";

export default function WhatSection() {
    return (
        <div className="relative">
            <img src="/images/masyarakat/hiasan.png" width={100} alt="hiasan" className="absolute left-0 top-0" />
            <div className="container py-20 space-y-5 md:space-y-0 px-5 md:px-0">
                <div className="grid lg:grid-cols-2">
                    <img src="/images/masyarakat/what.png" alt="what" />
                    <div className="space-y-5 pl-5">
                        <Garis />
                        <h1 className="font-extrabold text-3xl lg:text-4xl">Apa Itu<span className="block">Kegiatan CSR?</span></h1>
                        <p>
                            Corporate Social Responsibility (CSR) merupakan konsep di mana perusahaan secara sadar mengintegrasikan kepedulian sosial dan lingkungan ke dalam operasional bisnisnya. Ini melibatkan tindakan sukarela yang memberikan manfaat bagi masyarakat, seperti program pendidikan, kesehatan, dan lingkungan, serta upaya untuk mengurangi dampak negatif terhadap lingkungan. CSR tidak hanya mencerminkan tanggung jawab perusahaan terhadap masyarakat, tetapi juga dapat meningkatkan reputasi dan daya saing bisnis.
                        </p>
                        <p>
                            Berdasarkan Undang-Undang nomor 40  Tahun 2007 tentang Perseroan Terbatas (UUPT) pasal 1 ayat 3, pengertian Tanggung Jawab Sosial dan Lingkungan Perusahaan (TJSLP) atau Corporate Social Responsibility (CSR) adalah komitmen perseroan untuk berperan serta dalam pembangunan ekonomi berkelanjutan guna meningkatkan kualitas kehidupan dan lingkungan yang bermanfaat, baik bagi perseroan sendiri, komunitas setempat, maupun masyarakat pada umumnya.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}