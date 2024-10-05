import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { Check, Info, Pencil, X } from "lucide-react";

export function DialogTolak() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="border border-primary w-full sm:w-40 gap-3 bg-primary-bg text-primary">
                    <X className="w-5 h-5" />
                    Tolak
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader className="text-left">
                    <AlertDialogTitle>
                        <div className="space-y-3">
                            <div className="rounded-full border-4 border-[#F4F7FB] bg-[#E7EEF7] p-3 w-fit">
                                <Info className="w-5 h-5 " />
                            </div>
                            <h1 className="text-xl">Tolak Laporan?</h1>
                        </div>
                    </AlertDialogTitle>
                    <AlertDialogDescription className="space-y-3">
                        <p className="text-[#585858] text-base">
                            Laporan akan ditolak dan pihak mitra harus
                            mengirimkan laporan kembali
                        </p>
                        <div className="space-y-2">
                            <Label
                                htmlFor="alasan"
                                className="text-base text-black"
                            >
                                Alasan
                            </Label>
                            <Textarea
                                name="alasan"
                                placeholder="Masukan Alasan"
                                className="text-base"
                                id="alasan"
                            ></Textarea>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="md:grid md:grid-cols-2">
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction className="hover:bg-red-700">
                        Tolak
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export function DialogRevisi() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="border border-[#2C5586] w-full sm:w-40 gap-3 bg-[#F4F7FB] text-[#2C5586]">
                    <Pencil className="w-5 h-5" />
                    Revisi
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader className="text-left">
                    <AlertDialogTitle>
                        <div className="space-y-3">
                            <div className="rounded-full border-4 border-[#F4F7FB] bg-[#E7EEF7] p-3 w-fit">
                                <Info className="w-5 h-5 " />
                            </div>
                            <h1 className="text-xl">Revisi</h1>
                        </div>
                    </AlertDialogTitle>
                    <AlertDialogDescription className="space-y-3">
                        <p className="text-[#585858] text-base">
                            Laporan akan diberikan kepada mitra untuk merevisi
                            beberapa hal yang tidak sesuai
                        </p>
                        <div className="space-y-2">
                            <Label
                                htmlFor="alasan"
                                className="text-base text-black"
                            >
                                Alasan
                            </Label>
                            <Textarea
                                name="alasan"
                                placeholder="Masukan Alasan Revisi"
                                className="text-base"
                                id="alasan"
                            ></Textarea>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="md:grid md:grid-cols-2">
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction className="hover:bg-red-700">
                        Kirim
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export function DialogTerima() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className=" w-full sm:w-40 gap-3 bg-[#2C5586] hover:bg-[#2C5586]/90 text-white">
                    <Check className="w-5 h-5" />
                    Terima
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader className="text-left">
                    <AlertDialogTitle>
                        <div className="space-y-3">
                            <div className="rounded-full border-4 border-[#F4F7FB] bg-[#E7EEF7] p-3 w-fit">
                                <Info className="w-5 h-5 " />
                            </div>
                            <h1 className="text-xl">Terima Laporan?</h1>
                        </div>
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-[#585858] text-base">
                        Laporan akan diterima dan data portal CSR Kabupaten
                        Cirebon akan ter-update secara otomatis
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="md:grid md:grid-cols-2">
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction className="hover:bg-red-700">
                        Terima
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
