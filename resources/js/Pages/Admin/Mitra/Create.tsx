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
import { CloudUpload, Eye, EyeOff, Send } from "lucide-react";
import { Textarea } from "@/Components/ui/textarea";
import { PageProps } from "@/types";
import axios from "axios";
import toast from "react-hot-toast";

const mitraSchema = z.object({
    name: z.string(),
    perusahaan: z.string(),
    no_telepon: z.string(),
    email: z.string(),
    alamat: z.string(),
    deskripsi: z.string(),
    password: z.string(),
    image: z
        .instanceof(FileList)
        .refine((file) => file?.length == 1, "File is required."),
});

type MitraSchema = z.infer<typeof mitraSchema>;

export default function Create({ auth: { user }, notifications }: PageProps) {
    const [preview, setPreview] = useState<string | null>(null);
    const [showPass, setShowPass] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const form = useForm<MitraSchema>({
        resolver: zodResolver(mitraSchema),
        defaultValues: {
            name: "",
            perusahaan: "",
            no_telepon: "",
            password: "",
            email: "",
            alamat: "",
            deskripsi: "",
        },
    });

    const { handleSubmit, control } = form;

    const fileRef = form.register("image");

    const submit = handleSubmit((values) => {
        setIsSubmitted(true)

        const formData = new FormData()
        formData.append('name', values.name)
        formData.append('email', values.email)
        formData.append('no_telepon', values.no_telepon)
        formData.append('deskripsi', values.deskripsi)
        formData.append('perusahaan', values.perusahaan)
        formData.append('password', values.password)
        formData.append('alamat', values.alamat)
        formData.append('image', values.image[0])

        const promise = axios.post('/admin/mitra', formData);

        toast.promise(promise, {
            loading: "Loading...",
            success: () => {
                setIsSubmitted(false)
                window.location.replace('/admin/mitra')
                return "Add Mitra Success"
            },
            error: (err) => {
                setIsSubmitted(false)
                return err?.response.data.message || "Something went wrong"
            }
        })
    });

    const handlePreview = (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <LayoutAdmin user={user} notifications={notifications}>
            <Head title="Buat Mitra" />
            <div className="container px-5 py-10">
                <div className="mb-10">
                    <BreadcrumbLinks basePath="/admin" pagePath="Buat mitra" />
                </div>
                <h1 className="font-bold text-2xl mb-5">Buat Mitra Baru</h1>
                <Form {...form}>
                    <form onSubmit={submit} className="space-y-5">
                        <div className="bg-white rounded-md p-6 space-y-5 border">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt=""
                                        className="w-full rounded-md"
                                    />
                                ) : (
                                    <div className="bg-neutral-300 rounded-md w-full h-72"></div>
                                )}
                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-bold text-base">
                                                Dokumen Pendukung{" "}
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
                                                        <div className="rounded-full border-4 bg-[#FFDDDC] border-[#FFF1F0] text-primary p-2">
                                                            <CloudUpload className="w-5 h-5" />
                                                        </div>
                                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 font-semibold">
                                                            <span className="text-primary">
                                                                Klik untuk unggah
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
                                                        className="h-0 opacity-0"
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
                                                    placeholder="Masukan nama mitra"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="perusahaan"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel className="font-bold text-base">
                                                Nama PT{" "}
                                                <span className="text-red-800">
                                                    *
                                                </span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    required
                                                    placeholder="Masukan nama PT"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="no_telepon"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel className="font-bold text-base">
                                                No Telepon{" "}
                                                <span className="text-red-800">
                                                    *
                                                </span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    required
                                                    placeholder="Masukan No Telepon"
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
                                                    placeholder="Masukan email"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-bold text-base">
                                                Kata Sandi{" "}
                                                <span className="text-red-800">
                                                    *
                                                </span>
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        required
                                                        type={
                                                            showPass
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        placeholder="Masukan kata sandi"
                                                        {...field}
                                                    />
                                                    <Button
                                                        variant={"ghost"}
                                                        size={"icon"}
                                                        type="button"
                                                        className="absolute right-0 top-0"
                                                        onClick={() => {
                                                            setShowPass(
                                                                !showPass
                                                            );
                                                        }}
                                                    >
                                                        {showPass ? (
                                                            <EyeOff className="w-5 h-5 text-[#344054]" />
                                                        ) : (
                                                            <Eye className="w-5 h-5 text-[#344054]" />
                                                        )}
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
                                <FormField
                                    control={form.control}
                                    name="alamat"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-bold text-base">
                                                Alamat{" "}
                                                <span className="text-red-800">
                                                    *
                                                </span>
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Masukan Alamat"
                                                    className="resize-none"
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
                                                    placeholder="Masukan Deskripsi"
                                                    className="resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-md border flex justify-end items-center gap-4">
                            <Button variant={"outline"} asChild disabled={isSubmitted}>
                                <Link href="/admin/mitra">
                                    Kembali
                                </Link>
                            </Button>
                            <Button
                                type="submit"
                                className="hover:bg-red-700 font-semibold gap-2"
                                disabled={isSubmitted}
                            >
                                <Send className="w-4 h-4" />
                                Submit
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </LayoutAdmin>
    );
}
