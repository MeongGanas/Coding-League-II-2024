import { Download } from "lucide-react";
import { Button } from "../ui/button";

export default function DownloadButtons({ menu }: { menu: string }) {
    return (
        <>
            <Button className="border bg-white text-success hover:bg-success-bg"
                onClick={() => window.open(`/admin/download/${menu}/csv`)}>
                <Download className="w-5 h-5 mr-2" />
                Unduh .csv
            </Button>
            <Button className="border bg-white text-primary hover:bg-primary-bg"
                onClick={() => window.open(`/admin/download/${menu}/pdf`)}>
                <Download className="w-5 h-5 mr-2" />
                Unduh .pdf
            </Button>
        </>
    );
}
