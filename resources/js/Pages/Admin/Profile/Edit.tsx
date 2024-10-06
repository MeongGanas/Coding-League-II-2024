import BreadcrumbLinks from "@/Components/all/BreadcrumbLinks";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import LayoutAdmin from "@/Layouts/LayoutAdmin";
import { Head, Link } from "@inertiajs/react";
import { SyntheticEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { CloudUpload, Save, Send } from "lucide-react";
import { Textarea } from "@/Components/ui/textarea";

const proyekSchema = z.object({
    nama: z.string(),
    email: z.string(),
    deskripsi: z.string(),
    foto: z
        .instanceof(FileList)
        .refine((file) => file?.length == 1, "File is required."),
});

type ProyekSchema = z.infer<typeof proyekSchema>;

export default function Edit() {
    const [preview, setPreview] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const form = useForm<ProyekSchema>({
        resolver: zodResolver(proyekSchema),
        defaultValues: {
            nama: "",
            email: "",
            deskripsi: "",
        },
    });

    const { handleSubmit, control } = form;

    const fileRef = form.register("foto");

    const submit = handleSubmit((values) => {
        console.log(values);
    });

    const handlePreview = (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <LayoutAdmin>
            <Head title="Ubah Profil" />
            <div className="container px-5 py-10">
                <div className="mb-10">
                    <BreadcrumbLinks basePath="/admin" pagePath="Ubah profil" />
                </div>
                <h1 className="font-bold text-2xl mb-5">Ubah Profil</h1>
                <Form {...form}>
                    <form onSubmit={submit} className="space-y-5">
                        <div className="bg-white rounded-md p-6 space-y-3 border">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div className="bg-neutral-300 rounded-md w-full h-72"></div>
                                <FormField
                                    control={form.control}
                                    name="foto"
                                    render={({ field }) => (
                                        <FormItem className="col-span-2">
                                            <FormLabel className="font-bold text-base">
                                                Foto{" "}
                                                <span className="text-red-800">
                                                    *
                                                </span>
                                            </FormLabel>
                                            <FormControl>
                                                <label
                                                    htmlFor="dropzone-file"
                                                    className="flex flex-col items-center justify-center w-full border rounded-lg cursor-pointer bg-white hover:bg-gray-50 "
                                                >
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        {preview && (
                                                            <img
                                                                src={preview}
                                                                alt=""
                                                                className="w-60"
                                                            />
                                                        )}
                                                        <div className="rounded-full border-4 bg-[#FFDDDC] border-[#FFF1F0] text-primary p-2">
                                                            <CloudUpload className="w-5 h-5" />
                                                        </div>
                                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 font-semibold">
                                                            <span className="text-primary">
                                                                Klik untuk
                                                                unggah
                                                            </span>{" "}
                                                            atau seret dan lepas
                                                            kesini
                                                        </p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                                            PNG, JPG up to 10MB
                                                        </p>
                                                    </div>
                                                    <Input
                                                        {...fileRef}
                                                        id="dropzone-file"
                                                        type="file"
                                                        accept="image/png, image/jpg"
                                                        className="hidden"
                                                        onChange={(e) =>
                                                            handlePreview(e)
                                                        }
                                                    />
                                                </label>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={control}
                                name="nama"
                                render={({ field }) => (
                                    <FormItem className="grid gap-2">
                                        <FormLabel className="font-bold text-base">
                                            Nama Mitra{" "}
                                            <span className="text-red-800">
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                required
                                                placeholder="Masukan nama kamu"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="grid gap-2">
                                        <FormLabel className="font-bold text-base">
                                            Email{" "}
                                            <span className="text-red-800">
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                required
                                                placeholder="Masukan email kamu"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="deskripsi"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold text-base">
                                            Deskripsi{" "}
                                            <span className="text-red-800">
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Masukan deskripsi diri kamu"
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="bg-white p-4 rounded-md border flex justify-end items-center gap-4">
                            <Button variant={"outline"} disabled={isSubmitted}>
                                <Link href="/admin/mitra/1/detail">
                                    Kembali
                                </Link>
                            </Button>
                            <Button
                                type="submit"
                                className="hover:bg-red-700 font-semibold gap-2"
                                disabled={isSubmitted}
                            >
                                <Save className="w-4 h-4" />
                                Simpan
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </LayoutAdmin>
    );
}
