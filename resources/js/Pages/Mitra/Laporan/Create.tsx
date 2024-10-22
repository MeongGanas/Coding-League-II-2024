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
import { SyntheticEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, CloudUpload, Home, Save, Send } from "lucide-react";
import { Calendar } from "@/Components/ui/calendar";
import { format } from "date-fns";
import { Textarea } from "@/Components/ui/textarea";
import { Kecamatan, PageProps, Proyek, Sektor } from "@/types";
import toast from "react-hot-toast";
import axios from "axios";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/Components/ui/breadcrumb";

const proyekSchema = z.object({
    name: z.string(),
    sektor_id: z.string(),
    proyek_id: z.string(),
    realisasi_date: z.date({
        required_error: "Tanggal awal is required.",
    }),
    realisasi: z.number(),
    lokasi: z.string(),
    rincian: z.string(),
    images: z
        .instanceof(FileList)
        .refine((file) => file?.length >= 1, "File is required."),
});

type ProyekSchema = z.infer<typeof proyekSchema>;

export default function Create({ auth: { user }, sektors, proyeks }: PageProps<{ sektors: Sektor[], proyeks: Proyek[] }>) {
    const [preview, setPreview] = useState<string | null>(null);
    const [status, setStatus] = useState("terbit");
    const [kecamatan, setKecamatan] = useState<Kecamatan[] | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const form = useForm<ProyekSchema>({
        resolver: zodResolver(proyekSchema),
        defaultValues: {
            name: "",
            sektor_id: "",
            proyek_id: "",
            lokasi: "",
            realisasi: 0,
            realisasi_date: new Date(),
            rincian: "",
        },
    });

    const { handleSubmit, control } = form;

    const fileRef = form.register("images");

    const submit = handleSubmit((values) => {
        setIsSubmitted(true)

        const formData = new FormData()
        formData.append('name', values.name)
        formData.append('sektor_id', values.sektor_id)
        formData.append('rincian', values.rincian)
        formData.append('proyek_id', values.proyek_id)
        formData.append('realisasi_date', values.realisasi_date.toISOString().slice(0, 19).replace('T', ' '))
        // formData.append('image', values.image)


        const promise = axios.post('/mitra/laporan', formData);

        toast.promise(promise, {
            loading: "Loading...",
            success: () => {
                setIsSubmitted(false)
                window.location.replace('/admin/proyek')
                return "Add Proyek Success"
            },
            error: (err) => {
                console.log(err.response.data)
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
    }

    useEffect(() => {
        (
            async () => {
                fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/3209.json`)
                    .then(response => response.json())
                    .then(districts => setKecamatan(districts));
            }
        )()
    }, [])

    return (
        <LayoutAdmin user={user}>
            <Head title="Buat Proyek" />
            <div className="container px-5 py-10">
                <div className="mb-10">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href={`/mitra/dashboard`}>
                                    <Home
                                        className="w-5 h-5"
                                    />
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link
                                        href="/mitra/dashboard"
                                        className="capitalize"
                                    >
                                        Laporan
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage className="bg-primary-bg capitalize text-primary py-1 px-2 rounded-md font-bold">
                                    Detail Laporan
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <h1 className="font-bold text-2xl mb-5">Buat Laporan Baru</h1>
                <Form {...form}>
                    <form onSubmit={submit} className="space-y-5">
                        <div className="bg-white rounded-md p-6 space-y-5 border">
                            <FormField
                                control={control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="grid gap-2">
                                        <FormLabel className="font-bold text-base">
                                            Judul Laporan{" "}
                                            <span className="text-red-800">
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                required
                                                placeholder="Masukan nama laporan CSR"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                                <FormField
                                    control={control}
                                    name="sektor_id"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel className="font-bold text-base">
                                                Sektor CSR{" "}
                                                <span className="text-red-800">
                                                    *
                                                </span>
                                            </FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Pilih sektor CSR" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>
                                                            Sektor
                                                        </SelectLabel>
                                                        {sektors && sektors.map(sektor => (
                                                            <SelectItem value={sektor.id.toString()} key={sektor.id}>
                                                                {sektor.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="proyek_id"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel className="font-bold text-base">
                                                Nama Proyek CSR{" "}
                                                <span className="text-red-800">
                                                    *
                                                </span>
                                            </FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Pilih proyek CSR" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>
                                                            Proyek
                                                        </SelectLabel>
                                                        {proyeks && proyeks.map(proyek => (
                                                            <SelectItem value={proyek.id.toString()} key={proyek.id}>
                                                                {proyek.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="realisasi_date"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col gap-2">
                                            <FormLabel className="text-base font-bold">
                                                Tanggal{" "}
                                                <span className="text-red-800">
                                                    *
                                                </span>
                                            </FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full pl-3 text-left font-normal",
                                                                !field.value &&
                                                                "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(
                                                                    field.value,
                                                                    "PPP"
                                                                )
                                                            ) : (
                                                                <span>
                                                                    dd/mm/yyyy
                                                                </span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent
                                                    className="w-auto p-0"
                                                    align="start"
                                                >
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={
                                                            field.onChange
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="realisasi"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel className="font-bold text-base">
                                                Realisasi{" "}
                                                <span className="text-red-800">
                                                    *
                                                </span>
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        required
                                                        placeholder="Masukan realisasi"
                                                        type="number"
                                                        className="pl-10"
                                                        {...field}
                                                    />
                                                    <span className="absolute top-1.5 left-3">Rp.</span>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={control}
                                name="lokasi"
                                render={({ field }) => (
                                    <FormItem className="grid gap-2">
                                        <FormLabel className="font-bold text-base">
                                            Lokasi Kecamatan
                                            <span className="text-red-800">
                                                *
                                            </span>
                                        </FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih kecamatan" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>
                                                        Kecamatan
                                                    </SelectLabel>
                                                    {kecamatan && kecamatan.map(camat => (
                                                        <SelectItem value={camat.name} key={camat.id}>
                                                            {camat.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="rincian"
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
                                                placeholder="Masukan deskripsi laporan"
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
                                name="images"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold text-base">
                                            Foto Laporan Kegiatan{" "}
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
                                                            alt="preview"
                                                            className="w-60 mb-5"
                                                        />
                                                    )}
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
                        </div>

                        <div className="bg-white p-4 rounded-md border flex justify-end items-center gap-4">
                            <Button
                                type="submit"
                                className="border bg-transparent text-neutral-600 gap-2 font-semibold"
                                disabled={isSubmitted}
                                onClick={() => { setStatus("draf") }}
                            >
                                <Save className="w-5 h-5" />
                                Simpan Sebagai Draft
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
