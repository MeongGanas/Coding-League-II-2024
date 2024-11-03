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
import axios from "axios";
import { Check, Info, Pencil, Power, X } from "lucide-react";
import toast from "react-hot-toast";

export function DialogToggleStatus({ data, status }: { data: number, status: string }) {
    const handleSubmit = () => {
        const promise = axios.post(`/admin/mitra/${data}/toggle`);
        toast.promise(promise, {
            loading: "Memproses...",
            success: () => {
                window.location.reload();
                return "Mitra berhasil dinonaktifkan";
            },
            error: () => {
                return "Gagal menonaktifkan mitra";
            },
        });
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    type="submit"
                    className="bg-white hover:bg-primary-bg border-primary text-primary gap-2 font-bold"
                >
                    <Power className="w-4 h-4" />
                    {status === 'Aktif' ? 'Non-Aktifkan ' : 'Aktifkan '} Mitra
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader className="text-left">
                    <AlertDialogTitle>
                        <div className="space-y-3">
                            <div className="rounded-full border-4 border-[#F4F7FB] bg-[#E7EEF7] p-3 w-fit">
                                <Info className="w-5 h-5 " />
                            </div>
                            <h1 className="text-xl">{status === 'Aktif' ? 'Non-Aktifkan ' : 'Aktifkan '} Mitra?</h1>
                        </div>
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-[#585858] text-base">
                        {
                            status === 'Aktif' ? 'Mitra akan dinonaktifkan sementara, anda bisa mengaktifkan kembali setelahnya' : 'Apakah anda yakin ingin mengaktifkan mitra ini?'
                        }
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="md:grid md:grid-cols-2">
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction className="hover:bg-red-700" onClick={handleSubmit}>
                        Simpan
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
