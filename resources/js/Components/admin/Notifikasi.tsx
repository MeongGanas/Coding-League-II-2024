import { Bell, X } from "lucide-react";
import { Badge } from "../ui/badge";
import {
    Popover,
    PopoverClose,
    PopoverContent,
    PopoverTrigger,
} from "../ui/popover";
import { Button } from "../ui/button";
import { Link } from "@inertiajs/react";

export default function Notifikasi() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full relative"
                >
                    <Bell className="h-6 w-6" />
                    <Badge className="w-6 -right-2 absolute top-0 bg-[#98100A] flex hover:bg-red-700 items-center justify-center">
                        99
                    </Badge>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[350px] space-y-4 md:w-[500px] mr-5">
                <div className="flex justify-between items-center">
                    <h1 className="font-bold text-neutral-600 text-lg">
                        Notifikasi
                    </h1>
                    <PopoverClose>
                        <Button size={"icon"} variant={"ghost"}>
                            <X className="w-5 h-5" />
                        </Button>
                    </PopoverClose>
                </div>
                <div className="space-y-3">
                    <ItemNotifikasi status="diterima" />
                    <ItemNotifikasi status="ditolak" />
                    <ItemNotifikasi status="baru" />
                </div>
            </PopoverContent>
        </Popover>
    );
}

function ItemNotifikasi({ status }: { status: string }) {
    return (
        <Link
            href=""
            className={`block rounded-md ${
                status === "baru" ? "bg-[#FFF1F0]" : "bg-white"
            } border p-4`}
        >
            {status === "diterima" ? (
                <Badge className="bg-[#ECFDF3] text-success text-[15px] hover:bg-success-bg font-light">
                    Laporan telah diterima!
                </Badge>
            ) : status === "ditolak" ? (
                <Badge className="bg-[#FEF3F2] text-primary text-[15px] hover:bg-primary-bg font-light">
                    Laporan ditolak!
                </Badge>
            ) : (
                <Badge className="bg-[#EFF8FF] text-[#175CD3] text-[15px] hover:bg-[#EFF6FF] font-light">
                    Laporan Baru!
                </Badge>
            )}

            <h1 className="font-bold">
                Laporan pengadaan perkakas masak untuk desa
            </h1>
            <p className="text-neutral-600">Mitra Sejahtera</p>
        </Link>
    );
}
