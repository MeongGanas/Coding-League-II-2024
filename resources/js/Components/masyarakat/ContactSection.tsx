import { Mail, MapPin, Phone } from "lucide-react";
import Garis from "./Garis";

export default function ContactSection() {
    return (
        <div className="container">
            <div className="grid px-5 py-14 space-y-5 lg:space-y-0 lg:grid-cols-2 items-center">
                <div className="space-y-5 lg:pr-14">
                    <Garis />
                    <h1 className="font-bold text-2xl md:text-3xl">Hubungi Kami</h1>
                    <p className="text-neutral-600 md:text-base lg:text-lg">Hubungi kami melalui formulir di samping, atau melalui kontak di bawah</p>
                    <ul className="space-y-5">
                        <li className="space-y-1">
                            <div className="flex items-center gap-2">
                                <div className="p-2 border-4 h-fit text-primary bg-[#FFDDDC] rounded-full border-primary-bg">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg md:text-xl font-semibold">Alamat</h3>
                            </div>
                            <p className="text-primary md:text-base ml-[52px] font-semibold ">Jl. Sunan Kalijaga No.7, Sumber, Kec. Sumber, Kabupaten Cirebon, Jawa Barat 45611</p>
                        </li>
                        <li className="space-y-1">
                            <div className="flex items-center gap-2">
                                <div className="p-2 border-4 h-fit text-primary bg-[#FFDDDC] rounded-full border-primary-bg">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg md:text-xl font-semibold">Phone</h3>
                            </div>
                            <p className="text-primary md:text-base ml-[52px] font-semibold ">(0231) 321197 <span className="text-neutral-500">atau</span> (0231) 3211792</p>
                        </li>
                        <li className="space-y-1">
                            <div className="flex items-center gap-2">
                                <div className="p-2 border-4 h-fit text-primary bg-[#FFDDDC] rounded-full border-primary-bg">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg md:text-xl font-semibold">Email</h3>
                            </div>
                            <p className="text-primary md:text-base ml-[52px] font-semibold ">pemkab@cirebonkab.go.id</p>
                        </li>
                    </ul>
                </div>
                <div className="w-full flex justify-end">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15838.923362284768!2d107.54403470006717!3d-7.040885375920516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68ec69b223b3cb%3A0x8ec9c9cc90a1c5ce!2sJl.%20Raya%20Soreang%20-%20Banjaran%2C%20Kabupaten%20Bandung%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1729074575081!5m2!1sid!2sid" className="w-full rounded-md h-[400px] border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </div>
    )
}