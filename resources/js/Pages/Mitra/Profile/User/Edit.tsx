import BreadcrumbLinks from "@/Components/all/BreadcrumbLinks";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import { Head, Link } from "@inertiajs/react";
import { SyntheticEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { CloudUpload, Save } from "lucide-react";
import { Textarea } from "@/Components/ui/textarea";
import { PageProps } from "@/types";
import axios from "axios";
import toast from "react-hot-toast";
import LayoutMitra from "@/Layouts/LayoutMitra";

const profileSchema = z.object({
    name: z.string(),
    email: z.string(),
    deskripsi: z.string(),
    image: z.instanceof(FileList).optional(),
});

type ProfileSchema = z.infer<typeof profileSchema>;

export default function Edit({ auth: { user } }: PageProps) {
    const [preview, setPreview] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const form = useForm<ProfileSchema>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
            deskripsi: user.deskripsi || "",
        },
    });

    const { handleSubmit, control } = form;

    const fileRef = form.register("image");

    const submit = handleSubmit((values) => {
        setIsSubmitted(true);

        const formData = new FormData();
        formData.append('_method', 'PATCH');
        formData.append('name', values.name)
        formData.append('deskripsi', values.deskripsi);
        formData.append('email', values.email);

        if (values.image && values.image?.length > 0) {
            formData.append('image', values.image[0]);
        }

        const promise = axios.post(`/profil/${user.id}`, formData);

        toast.promise(promise, {
            loading: "Loading...",
            success: () => {
                setIsSubmitted(false);
                window.location.replace('/admin/profile')
                return "Update Profile Success!"
            },
            error: (err) => {
                setIsSubmitted(false)
                return err?.response.data.message || "Something went wrong"
            }
        });
    });

    const handlePreview = (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <LayoutMitra user={user}>
            <Head title="Ubah Profil" />
            <div className="container px-5 py-10">
                <div className="mb-10">
                    <BreadcrumbLinks basePath="/mitra" pagePath="Ubah profil" />
                </div>
                <h1 className="font-bold text-2xl mb-5">Ubah Profil</h1>
                <Form {...form}>
                    <form onSubmit={submit} className="space-y-5">
                        <div className="bg-white rounded-md p-6 space-y-3 border">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                {user.image ? (
                                    <div className="bg-neutral-100 rounded-md w-full flex items-center">
                                        <img src={`/storage/${user.image}`} className="w-full" alt="user_image" />
                                    </div>
                                ) : (
                                    <div className="bg-neutral-100 rounded-md w-full h-72"></div>
                                )}
                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={({ field }) => (
                                        <FormItem className="col-span-2">
                                            <FormLabel htmlFor="image" className="font-bold text-base">
                                                Foto{" "}
                                                <span className="text-red-800">
                                                    *
                                                </span>
                                            </FormLabel>
                                            <label
                                                htmlFor="image"
                                                className="flex flex-col items-center justify-center w-full border rounded-lg cursor-pointer bg-white hover:bg-gray-50 "
                                            >
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    {preview && (
                                                        <img
                                                            src={preview}
                                                            alt=""
                                                            className="w-60 mb-2"
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
                                                <FormControl>
                                                    <Input
                                                        id="image"
                                                        type="file"
                                                        accept="image/png, image/jpg"
                                                        className="opacity-0 h-0"
                                                        {...fileRef}
                                                        onChange={(e) => handlePreview(e)}
                                                    />
                                                </FormControl>
                                            </label>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={control}
                                name="name"
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
                            <Button variant={"outline"} asChild disabled={isSubmitted}>
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
        </LayoutMitra>
    );
}
