import { Download } from "lucide-react";
import { Button } from "../ui/button";
import { useRef } from "react";

export default function DownloadButtons({ menu }: { menu: string }) {
    const params = new URLSearchParams(window.location.search);
    const paramAsUri = params ? `?${params.toString()}` : "";
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const handleDownload = async (fileType: string, event?: any) => {
        if (fileType === 'pdf') {
            try {
                event.target.disabled = true;
                const response = await fetch(`/admin/download/${menu}/${fileType}${paramAsUri}`);
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                window.open(url, '_blank');
            } catch (error) {
                console.error('Error fetching the PDF:', error);
            } finally {
                event.target.disabled = false;
            }
        } else {
            if (iframeRef.current) {
                iframeRef.current.src = `/admin/download/${menu}/${fileType}${paramAsUri}`;
            }
        }
    };


    return (
        <>
            <Button className="border bg-white text-success hover:bg-success-bg"
            onClick={() => handleDownload("csv")}
                >
                <Download className="w-5 h-5 mr-2" />
                Unduh .csv
            </Button>
            <Button className="border bg-white text-primary hover:bg-primary-bg"
            onClick={() => handleDownload("pdf", event)}
                >
                <Download className="w-5 h-5 mr-2" />
                Unduh .pdf
            </Button>
            <iframe ref={iframeRef} style={{ display: 'none' }} />
        </>
    );
}
