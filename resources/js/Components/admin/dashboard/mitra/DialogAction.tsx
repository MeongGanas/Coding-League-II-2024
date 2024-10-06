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
import { Check, Info, Pencil, Power, X } from "lucide-react";

export function DialogNonaktifkan() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    type="submit"
                    className="bg-white hover:bg-primary-bg border-primary text-primary gap-2 font-bold"
                >
                    <Power className="w-4 h-4" />
                    Non-aktifkan mitra
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader className="text-left">
                    <AlertDialogTitle>
                        <div className="space-y-3">
                            <div className="rounded-full border-4 border-[#F4F7FB] bg-[#E7EEF7] p-3 w-fit">
                                <Info className="w-5 h-5 " />
                            </div>
                            <h1 className="text-xl">Non-Aktifkan Mitra?</h1>
                        </div>
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-[#585858] text-base">
                        Mitra akan dinonaktifkan sementara, anda bisa
                        mengaktifkan kembali setelahnya
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="md:grid md:grid-cols-2">
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction className="hover:bg-red-700">
                        Simpan
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
