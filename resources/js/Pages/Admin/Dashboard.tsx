import LayoutAdmin from "@/Layouts/LayoutAdmin";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <LayoutAdmin>
            <Head title="Dashboard Admin" />
            <h1>Halo</h1>
        </LayoutAdmin>
    );
}
