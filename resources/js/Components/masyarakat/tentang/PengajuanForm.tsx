import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import axios from "axios";
import toast from "react-hot-toast";
import Garis from "../Garis";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/Components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Mitra, Proyek } from "@/types";

const pengajuanSchema = z.object({
    full_name: z.string(),
    instansi: z.string(),
    no_handphone: z.string(),
    mitra_id: z.string(),
    proyek_id: z.string(),
    tgl_lahir: z.date({
        required_error: "Tanggal awal is required.",
    }),
});

type PengajuanSchema = z.infer<typeof pengajuanSchema>;

export default function PengajuanForm({ proyeks, mitras }: { proyeks: Proyek[], mitras: Mitra[] }) {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const form = useForm<PengajuanSchema>({
        resolver: zodResolver(pengajuanSchema),
        defaultValues: {
            full_name: "",
            tgl_lahir: new Date('2000-01-01'),
            no_handphone: "",
            instansi: "",
            proyek_id: "",
            mitra_id: "",
        },
    });

    const { handleSubmit, control, reset } = form;

    const submit = handleSubmit((values) => {
        setIsSubmitted(true)

        const formData = new FormData()
        formData.append('full_name', values.full_name);
        formData.append('tgl_lahir', values.tgl_lahir.toISOString().slice(0, 19).replace('T', ' '));
        formData.append('no_handphone', values.no_handphone);
        formData.append('instansi', values.instansi);
        formData.append('proyek_id', values.proyek_id);
        formData.append('mitra_id', values.mitra_id);

        const promise = axios.post('/tentang/pengajuan', formData);

        toast.promise(promise, {
            loading: "Loading...",
            success: () => {
                setIsSubmitted(false)
                form.reset()
                return "Pengajuan berhasil dikirim"
            },
            error: (err) => {
                setIsSubmitted(false)
                return err?.response.data.message || "Something went wrong"
            }
        })
    });

    return (
        <div className="relative">
            <img src="/images/masyarakat/hiasan_3.png" width={150} alt="hiasan" className="absolute right-0 top-0 scale-y-[-1]" />
            <div className="container space-y-10 px-5 py-10">
                <Form {...form}>
                    <form onSubmit={submit} className="space-y-5 max-w-screen-lg mx-auto p-6 ">
                        <Garis />
                        <div className="space-y-4">
                            <FormField
                                control={control}
                                name="full_name"
                                render={({ field }) => (
                                    <FormItem className="grid gap-2">
                                        <FormLabel className="font-bold text-base">
                                            Nama Lengkap{" "}
                                            <span className="text-red-800">
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                required
                                                placeholder="Masukan nama lengkap"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="tgl_lahir"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-2">
                                        <FormLabel className="text-base font-bold">
                                            Tanggal Lahir{" "}
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
                                name="no_handphone"
                                render={({ field }) => (
                                    <FormItem className="grid gap-2">
                                        <FormLabel className="font-bold text-base">
                                            No Handphone / Whatsapp{" "}
                                            <span className="text-red-800">
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                required
                                                placeholder="Masukan no handphone / whatsapp"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="instansi"
                                render={({ field }) => (
                                    <FormItem className="grid gap-2">
                                        <FormLabel className="font-bold text-base">
                                            Nama Instansi / Perseroan{" "}
                                            <span className="text-red-800">
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                required
                                                placeholder="Masukan nama instansi / perseroan"
                                                {...field}
                                            />
                                        </FormControl>
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
                                            Nama Program{" "}
                                            <span className="text-red-800">
                                                *
                                            </span>
                                        </FormLabel>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih nama program" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>
                                                        Program
                                                    </SelectLabel>
                                                    {proyeks.map((proyek) => (
                                                        <SelectItem value={proyek.id.toString()}>
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
                                name="mitra_id"
                                render={({ field }) => (
                                    <FormItem className="grid gap-2">
                                        <FormLabel className="font-bold text-base">
                                            Nama Mitra{" "}
                                            <span className="text-red-800">
                                                *
                                            </span>
                                        </FormLabel>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih mitra" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>
                                                        Mitra
                                                    </SelectLabel>
                                                    {mitras.map((mitra) => (
                                                        <SelectItem value={mitra.id.toString()}>
                                                            {mitra.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex justify-end items-center">
                            <Button
                                type="submit"
                                className="hover:bg-red-700 font-semibold gap-2"
                                disabled={isSubmitted}
                            >
                                Kirim Pengajuan
                            </Button>
                        </div>
                    </form>
                </Form>
            </div >
        </div>
    );
}
