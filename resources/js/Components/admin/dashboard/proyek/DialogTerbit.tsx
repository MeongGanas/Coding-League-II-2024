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
import { Info, Send } from "lucide-react";

export function DialogTerbit({ terbitkan, isSubmitted }: { terbitkan: () => void, isSubmitted: boolean }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className=" w-full sm:w-40 gap-2 bg-primary hover:bg-red-700 text-white">
                    <Send className="w-4 h-4" />
                    Terbitkan
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader className="text-left">
                    <AlertDialogTitle>
                        <div className="space-y-3">
                            <div className="rounded-full border-4 border-[#F4F7FB] bg-[#E7EEF7] p-3 w-fit">
                                <Info className="w-5 h-5 " />
                            </div>
                            <h1 className="text-xl">Terbitkan Proyek?</h1>
                        </div>
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-[#585858] text-base">
                        Proyek yang diterbitkan dapat dilihat oleh mitra dan
                        umum
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="md:grid md:grid-cols-2">
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction className="hover:bg-red-700" onClick={terbitkan}>
                        Terbitkan
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
