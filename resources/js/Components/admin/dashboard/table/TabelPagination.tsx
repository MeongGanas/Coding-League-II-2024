import { Button } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function TablePagination() {
    return (
        <div className="border rounded-md w-fit flex items-center overflow-hidden">
            <Button
                asChild
                variant={"ghost"}
                className="gap-1 items-center rounded-none"
            >
                <Link href="/">
                    <ArrowLeft className="w-5 h-5" /> Sebelumnya
                </Link>
            </Button>
            <Button
                asChild
                variant={"ghost"}
                className="gap-1 border-l items-center rounded-none"
            >
                <Link href="/">1</Link>
            </Button>
            <Button
                asChild
                variant={"ghost"}
                className="gap-1 border-l items-center rounded-none"
            >
                <Link href="/">2</Link>
            </Button>
            <Button
                asChild
                variant={"ghost"}
                className="gap-1 items-center rounded-none border-l"
            >
                <Link href="/">
                    Selanjutnya <ArrowRight className="w-5 h-5" />
                </Link>
            </Button>
        </div>
    );
}
