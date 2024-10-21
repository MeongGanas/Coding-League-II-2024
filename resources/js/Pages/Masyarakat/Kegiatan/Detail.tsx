import KegiatanCard from "@/Components/masyarakat/card/KegiatanCard";
import Garis from "@/Components/masyarakat/Garis";
import OtherWelcomeSection from "@/Components/masyarakat/OtherWelcomeSection";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import LayoutMasyarakat from "@/Layouts/LayoutMasyarakat";
import { Kegiatan, PageProps } from "@/types";
import { Link } from "@inertiajs/react";
import { format } from "date-fns";
import { Facebook, Instagram, Link as LinkIcon, Twitter, TwitterIcon } from "lucide-react";
import toast from "react-hot-toast";
import Markdown from 'react-markdown';

export default function KegiatanDetail({ auth: { user }, kegiatan, kegiatanLainnya }: PageProps<{ kegiatan: Kegiatan, kegiatanLainnya: Kegiatan[] }>) {
    const shareToFacebook = () => {
        const currentUrl = window.location.href;
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
    };

    const shareToTwitter = () => {
        const currentUrl = window.location.href;
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`, '_blank');
    };

    const copyToClipboard = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl);
        toast.success("Link copied to clipboard!");
    };

    return (
        <LayoutMasyarakat user={user} title="Kegiatan Detail">
            <OtherWelcomeSection title={kegiatan.name} desc={format(new Date(kegiatan.tgl_terbit), 'MMMM dd, y')} />
            <div className="container py-10 max-w-screen-sm mx-auto space-y-4">
                <div className="space-y-4 border-b pb-10">
                    <Garis />
                    <Markdown>{kegiatan.deskripsi}</Markdown>
                </div>
                <div className="flex flex-wrap gap-3">
                    {kegiatan.tags.map((tag) => (
                        <Badge className="bg-[#F2F4F7] hover:bg-[#F2F4F7]/90 text-black">
                            tag
                        </Badge>
                    ))}
                </div>
                <div className="flex justify-end text-gray-600 gap-3 items-center">
                    <h1>Bagikan kegiatan</h1>
                    <Button variant={"outline"} size={"icon"} onClick={shareToFacebook}><Facebook className="w-4 h-4" /></Button>
                    <Button variant={"outline"} size={"icon"} onClick={shareToTwitter}><TwitterIcon className="w-4 h-4" /></Button>
                    <Button variant={"outline"} size={"icon"} onClick={copyToClipboard}><Instagram className="w-4 h-4" /></Button>
                    <Button variant={"outline"} size={"icon"} onClick={copyToClipboard}><LinkIcon className="w-4 h-4" /></Button>
                </div>
            </div>
            <div className="container py-10 px-5 space-y-10">
                <div className="space-y-5">
                    <Garis />
                    <h1 className="font-extrabold text-3xl lg:text-4xl">Kegiatan Lainnya</h1>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {kegiatanLainnya && kegiatanLainnya.map((kegiatan) => (
                        <KegiatanCard kegiatan={kegiatan} />
                    ))}
                </div>
                <div className="flex justify-center">
                    <Button variant={"outline"} asChild className="hover:bg-primary hover:border-primary hover:text-white"><Link href="/kegiatan">Lihat semua kegiatan</Link></Button>
                </div>
            </div>
        </LayoutMasyarakat>
    )
}
