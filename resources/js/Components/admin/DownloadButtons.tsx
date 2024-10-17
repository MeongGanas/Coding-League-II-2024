import { Download } from "lucide-react";
import { Button } from "../ui/button";

export default function DownloadButtons({ menu }: { menu: string }) {
    const params = new URLSearchParams(window.location.search);
    const paramAsUri = params ? `?${params.toString()}` : "";
    return (
        <>
            <Button className="border bg-white text-success hover:bg-success-bg"
                onClick={() => window.open(`/admin/download/${menu}/csv${paramAsUri}`)}>
                <Download className="w-5 h-5 mr-2" />
                Unduh .csv
            </Button>
            <Button className="border bg-white text-primary hover:bg-primary-bg"
                onClick={() => window.open(`/admin/download/${menu}/pdf${paramAsUri}`)}>
                <Download className="w-5 h-5 mr-2" />
                Unduh .pdf
            </Button>
        </>
    );
}
