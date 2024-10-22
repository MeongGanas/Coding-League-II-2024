import { Sektor } from "@/types";
import SektorCard from "../card/SektorCard";
import Garis from "../Garis";
import { useState } from "react";

export default function SektorListSection({ sektors }: { sektors: Sektor[] }) {
    return (
        <div className="relative">
            <img src="/images/masyarakat/hiasan_3.png" width={150} alt="hiasan" className="-z-10 absolute right-0 bottom-0" />
            <div className="container py-20 px-5 space-y-10">
                <div className="flex items-center flex-col space-y-5">
                    <Garis />
                    <h1 className="font-extrabold text-3xl lg:text-4xl">Sektor CSR</h1>
                    <p className="text-gray-600">Bidang program CSR Kabupaten Cirebon yang tersedia</p>
                </div>

                {sektors ? (
                    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {sektors.map((sektor) => (
                            <SektorCard sektor={sektor} key={sektor.id} />
                        ))}
                    </div>
                ) : (
                    <h1 className="text-center">Belum ada data sektor</h1>
                )}
            </div>
        </div>
    )
}
