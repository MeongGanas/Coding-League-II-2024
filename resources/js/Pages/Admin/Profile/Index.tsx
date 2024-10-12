import BreadcrumbLinks from "@/Components/all/BreadcrumbLinks";
import { Button } from "@/Components/ui/button";
import LayoutAdmin from "@/Layouts/LayoutAdmin";
import { PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { Pencil } from "lucide-react";

export default function Index({ auth: { user } }: PageProps) {
    return (
        <LayoutAdmin user={user}>
            <Head title="Profil" />
            <div className="container px-5 py-10 space-y-5">
                <div className="mb-10">
                    <BreadcrumbLinks basePath="/admin" pagePath="Profil" />
                </div>
                <div className="flex justify-between">
                    <h1 className="font-bold text-3xl">Profil</h1>
                    <Button className="hover:bg-red-700 gap-2" asChild>
                        <Link href="/admin/profile/1/edit">
                            <Pencil className="w-5 h-5" />
                            Ubah Profil
                        </Link>
                    </Button>
                </div>
                <div className="bg-white py-6 px-6 lg:px-20 border rounded-md">
                    <div className="grid grid-cols-1 space-y-5 lg:space-y-0 lg:grid-cols-2 xl:grid-cols-3 items-center lg:gap-10">
                        <div className="w-full">
                            {user.image ? (
                                <img src={`/storage/${user.image}`} alt="user_image" />
                            ) : (
                                <div className="bg-neutral-300 w-full h-72 rounded-md"></div>
                            )}
                        </div>
                        <div className="xl:col-span-2 space-y-2">
                            <h1 className="text-2xl font-bold">
                                {user.name}
                            </h1>
                            <p className="font-semibold text-base">
                                {user.email}
                            </p>
                            <p>
                                {user.deskripsi}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutAdmin>
    );
}
