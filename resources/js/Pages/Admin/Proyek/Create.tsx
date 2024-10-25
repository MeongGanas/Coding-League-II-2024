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
import { Head } from "@inertiajs/react";
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
import { CalendarIcon, CloudUpload, Save, Send } from "lucide-react";
import { Calendar } from "@/Components/ui/calendar";
import { format } from "date-fns";
import { Textarea } from "@/Components/ui/textarea";
import { Kecamatan, PageProps, Sektor } from "@/types";
import toast from "react-hot-toast";
import axios from "axios";

const proyekSchema = z.object({
    name: z.string(),
    sektor_id: z.string(),
    kecamatan: z.string(),
    tgl_awal: z.date({
        required_error: "Tanggal awal is required.",
    }),
    tgl_akhir: z.date().optional(),
    deskripsi: z.string(),
    image: z
        .instanceof(FileList)
        .refine((file) => file?.length == 1, "File is required."),
});

type ProyekSchema = z.infer<typeof proyekSchema>;

export default function Create({ auth: { user }, sektors, notifications }: PageProps<{ sektors: Sektor[], notifications: any }>) {
    const [preview, setPreview] = useState<string | null>(null);
    const [status, setStatus] = useState("terbit");
    const [kecamatan, setKecamatan] = useState<Kecamatan[] | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const form = useForm<ProyekSchema>({
        resolver: zodResolver(proyekSchema),
        defaultValues: {
            name: "",
            sektor_id: "",
            kecamatan: "",
            tgl_awal: new Date(),
            deskripsi: "",
        },
    });

    const { handleSubmit, control } = form;

    const fileRef = form.register("image");

    const submit = handleSubmit((values) => {
        setIsSubmitted(true)

        const formData = new FormData()
        formData.append('name', values.name)
        formData.append('sektor_id', values.sektor_id)
        formData.append('deskripsi', values.deskripsi)
        formData.append('kecamatan', values.kecamatan)
        formData.append('status', status)
        formData.append('tgl_awal', values.tgl_awal.toISOString().slice(0, 19).replace('T', ' '))
        formData.append('image', values.image[0])

        if (values.tgl_akhir) {
            formData.append('tgl_akhir', values.tgl_akhir.toISOString().slice(0, 19).replace('T', ' '))
        }

        const promise = axios.post('/admin/proyek', formData);

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
    };

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
        <LayoutAdmin user={user} notifications={notifications}>
            <Head title="Buat Proyek" />
            <div className="container px-5 py-10">
                <div className="mb-10">
                    <BreadcrumbLinks basePath="/admin" pagePath="Buat Proyek Buat" />
                </div>
                <h1 className="font-bold text-2xl mb-5">Buat Proyek Baru</h1>
                <Form {...form}>
                    <form onSubmit={submit} className="space-y-5">
                        <div className="bg-white rounded-md p-6 space-y-5 border">
                            <FormField
                                control={control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="grid gap-2">
                                        <FormLabel className="font-bold text-base">
                                            Nama Proyek{" "}
                                            <span className="text-red-800">
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                required
                                                placeholder="Masukan nama proyek CSR"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
                                <FormField
                                    control={control}
                                    name="kecamatan"
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
                                    control={control}
                                    name="tgl_awal"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col gap-2">
                                            <FormLabel className="text-base font-bold">
                                                Tanggal Awal{" "}
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
                                                        disabled={(date) =>
                                                            date > new Date() ||
                                                            date <
                                                            new Date(
                                                                "1900-01-01"
                                                            )
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
                                    name="tgl_akhir"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col gap-2">
                                            <FormLabel className="text-base font-bold">
                                                Tanggal Akhir{" "}
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
                            </div>
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
                                                placeholder="Masukan Deskripsi Proyek"
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
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold text-base">
                                            Foto Proyek{" "}
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
