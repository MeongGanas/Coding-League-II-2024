import { ChevronRight } from "lucide-react";
import Garis from "../Garis";
import { useState } from "react";

export default function FAQSection() {
    const [active, setActive] = useState('what')
    const [content, setContent] = useState('CSR atau Corporate Social Responsibility adalah komitmen perusahaan untuk berkontribusi dalam pembangunan berkelanjutan dengan cara memberikan dampak positif bagi masyarakat dan lingkungan sekitar. Di Kabupaten Cirebon, CSR dapat diwujudkan melalui berbagai program seperti pendidikan, kesehatan, lingkungan, dan pemberdayaan masyarakat.')

    const what = () => {
        setActive('what')
        setContent('CSR atau Corporate Social Responsibility adalah komitmen perusahaan untuk berkontribusi dalam pembangunan berkelanjutan dengan cara memberikan dampak positif bagi masyarakat dan lingkungan sekitar. Di Kabupaten Cirebon, CSR dapat diwujudkan melalui berbagai program seperti pendidikan, kesehatan, lingkungan, dan pemberdayaan masyarakat.')
    }

    const why = () => {
        setActive('why')
        setContent('Mengapa CSR penting di Kabupaten Cirebon?')
    }

    const how = () => {
        setActive('how')
        setContent('Bagaimana cara perusahaan di Kabupaten Cirebon menjalankan program CSR?')
    }

    const contoh = () => {
        setActive('contoh')
        setContent('Apa saja contoh program CSR di Kabupaten Cirebon?')
    }

    const mendukung = () => {
        setActive('mendukung')
        setContent('Bagaimana pemerintah Kabupaten Cirebon mendukung program CSR?')
    }

    return (
        <div className="bg-[#101828] px-5 py-20 relative text-white">
            <img src="/images/masyarakat/hiasan_3.png" width={150} alt="hiasan" className="absolute right-0 bottom-0" />
            <div className="container space-y-10">
                <div className="space-y-5">
                    <Garis />
                    <h1 className="font-extrabold text-3xl lg:text-4xl">Frequently Asked Question (FAQ)</h1>
                    <p>Pertanyaan yang sering muncul</p>
                </div>
                <div className="grid lg:grid-cols-2 space-y-10 lg:space-y-0">
                    <div className="pl-5">
                        <ul className="w-full">
                            <li className={`w-full max-w-[400px] p-5 flex border-l-4 justify-between cursor-pointer hover:bg-white/10 hover:border-l-[#FF5D56] transition-colors items-center text-lg md:text-xl lg:text- ${active === "what" ? "bg-white/10 border-l-[#FF5D56] font-bold" : "border-l-white/10"}`} onClick={what}>
                                Apa itu CSR? <ChevronRight className="w-5 h-5" />
                            </li>
                            <li className={`w-full max-w-[400px] p-5 flex border-l-4 justify-between cursor-pointer hover:bg-white/10 hover:border-l-[#FF5D56] transition-colors items-center text-lg md:text-xl lg:text- ${active === "why" ? "bg-white/10 border-l-[#FF5D56] font-bold" : "border-l-white/10"}`} onClick={why}>
                                Mengapa CSR penting di Kabupaten Cirebon? <ChevronRight className="w-5 h-5" />
                            </li>
                            <li className={`w-full max-w-[400px] p-5 flex border-l-4 justify-between cursor-pointer hover:bg-white/10 hover:border-l-[#FF5D56] transition-colors items-center text-lg md:text-xl lg:text- ${active === "how" ? "bg-white/10 border-l-[#FF5D56] font-bold" : "border-l-white/10"}`} onClick={how}>
                                Bagaimana cara perusahaan di Kabupaten Cirebon menjalankan program CSR? <ChevronRight className="w-5 h-5" />
                            </li>
                            <li className={`w-full max-w-[400px] p-5 flex border-l-4 justify-between cursor-pointer hover:bg-white/10 hover:border-l-[#FF5D56] transition-colors items-center text-lg md:text-xl lg:text- ${active === "contoh" ? "bg-white/10 border-l-[#FF5D56] font-bold" : "border-l-white/10"}`} onClick={contoh}>
                                Apa saja contoh program CSR di Kabupaten Cirebon? <ChevronRight className="w-5 h-5" />
                            </li>
                            <li className={`w-full max-w-[400px] p-5 flex border-l-4 justify-between cursor-pointer hover:bg-white/10 hover:border-l-[#FF5D56] transition-colors items-center text-lg md:text-xl lg:text- ${active === "mendukung" ? "bg-white/10 border-l-[#FF5D56] font-bold" : "border-l-white/10"}`} onClick={mendukung}>
                                Bagaimana pemerintah Kabupaten Cirebon mendukung program CSR? <ChevronRight className="w-5 h-5" />
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-5">
                        <p>{content}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}