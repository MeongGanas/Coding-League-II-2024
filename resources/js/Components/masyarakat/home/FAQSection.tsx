import { ChevronRight } from "lucide-react";
import Garis from "../Garis";
import { useState } from "react";

export default function FAQSection() {
    const [active, setActive] = useState('what')

    const faqs: {
        [key: string]: {
            question: string,
            answer: string
        }
    } = {
        what: {
            question: 'Apa itu CSR?',
            answer: 'CSR atau Corporate Social Responsibility adalah komitmen perusahaan untuk berkontribusi dalam pembangunan berkelanjutan dengan cara memberikan dampak positif bagi masyarakat dan lingkungan sekitar. Di Kabupaten Cirebon, CSR dapat diwujudkan melalui berbagai program seperti pendidikan, kesehatan, lingkungan, dan pemberdayaan masyarakat.'
        },
        why: {
            question: 'Mengapa CSR penting di Kabupaten Cirebon?',
            answer: 'CSR penting di Kabupaten Cirebon karena...'
        },
        how: {
            question: 'Bagaimana cara perusahaan di Kabupaten Cirebon menjalankan program CSR?',
            answer: 'Perusahaan di Kabupaten Cirebon menjalankan program CSR dengan...'
        },
        contoh: {
            question: 'Apa saja contoh program CSR di Kabupaten Cirebon?',
            answer: 'Contoh program CSR di Kabupaten Cirebon adalah...'
        },
        mendukung: {
            question: 'Bagaimana pemerintah Kabupaten Cirebon mendukung program CSR?',
            answer: 'Pemerintah Kabupaten Cirebon mendukung program CSR dengan...'
        },
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
                            {
                                Object.entries(faqs).map(([key, { question }], index) => (
                                    <li key={index} className={`w-full max-w-[430px] p-5 flex border-l-4 justify-between cursor-pointer hover:bg-white/10 hover:border-l-[#FF5D56] transition-colors items-center text-lg md:text-xl lg:text- ${active === key ? "bg-white/10 border-l-[#FF5D56] font-bold" : "border-l-white/10"}`} onClick={() => setActive(key)}>
                                        {question} <ChevronRight className="min-w-5 min-h-5 ml-[20px]" />
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="space-y-5">
                        {
                            faqs[active].answer
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
