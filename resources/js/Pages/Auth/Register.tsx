import LayoutAuth from "@/Layouts/LayoutAuth";
import { Head, Link } from "@inertiajs/react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import { SyntheticEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import ReCAPTCHA from 'react-google-recaptcha';
import axios from "axios";
import toast from "react-hot-toast";

const registerSchema = z.object({
    email: z.string().email(),
    name: z.string(),
    password: z.string(),
    confirm_password: z.string(),
});

type RegisterSchema = z.infer<typeof registerSchema>;

export default function Register() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [showPassConfirm, setShowPassConfirm] = useState(false);
    const [captchaValue, setCaptchaValue] = useState<null | string>(null);


    const form = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            name: "",
            password: "",
            confirm_password: "",
        },
    });

    const { handleSubmit, control } = form;

    const submit = handleSubmit((values) => {
        if (captchaValue) {
            setIsSubmitted(true)
            console.log(values)
            const promise = axios.post('/register', values);

            toast.promise(promise, {
                loading: "Loading...",
                success: () => {
                    setIsSubmitted(false)
                    window.location.replace('/login')
                    return "Register Success!"
                },
                error: (err) => {
                    setIsSubmitted(false)
                    return err?.response.data.message || "Something went wrong"
                }
            })
        } else {
            toast.error('Anda harus memastikan anda bukan robot')
        }
    });

    return (
        <LayoutAuth>
            <Head title="Register" />

            <div className="container py-10">
                <div className="bg-white grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 border rounded-md items-center">
                    <div className="px-5 sm:px-10 py-10 lg:py-14 space-y-5">
                        <Link
                            href="/"
                            className="text-primary px-0 flex items-center gap-1"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Kembali ke halaman utama
                        </Link>
                        <div className="space-y-3">
                            <h1 className="font-bold text-3xl">
                                Registrasi Mitra
                            </h1>
                            <p className="text-sm text-[#344054]">
                                Silakan masukan email dan kata sandi untuk masuk
                                ke halaman dashboard Anda
                            </p>
                        </div>
                        <Button variant={"outline"} asChild>
                            <Link href="/login" className="flex gap-1">
                                <span className="text-[#344054]">
                                    Sudah punya akun?
                                </span>
                                <span className="text-primary">
                                    Klik di sini
                                </span>
                            </Link>
                        </Button>
                    </div>
                    <div className="border-t xl:col-span-2 lg:border-t-0 lg:border-l px-5 sm:px-10 py-10 lg:py-14">
                        <Form {...form}>
                            <form onSubmit={submit} className="space-y-5">
                                <FormField
                                    control={control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel className="font-bold text-base">
                                                Email
                                                <span className="text-red-800">
                                                    *
                                                </span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    required
                                                    type="email"
                                                    placeholder="Masukan email anda"
                                                    {...field}
                                                />
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
                                                Nama Perusahaan
                                                <span className="text-red-800">
                                                    *
                                                </span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    required
                                                    placeholder="Masukan name perusahaan anda"
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
                                <FormField
                                    control={form.control}
                                    name="confirm_password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-bold text-base">
                                                Konfirmasi Kata Sandi{" "}
                                                <span className="text-red-800">
                                                    *
                                                </span>
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        required
                                                        type={
                                                            showPassConfirm
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        placeholder="Masukan konfirmasi kata sandi"
                                                        {...field}
                                                    />
                                                    <Button
                                                        variant={"ghost"}
                                                        size={"icon"}
                                                        type="button"
                                                        className="absolute right-0 top-0"
                                                        onClick={() => {
                                                            setShowPassConfirm(
                                                                !showPassConfirm
                                                            );
                                                        }}
                                                    >
                                                        {showPassConfirm ? (
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
                                <ReCAPTCHA
                                    sitekey="6LcOdl8qAAAAACiZPikTiZhxSACCzdN7dMYKljiO"
                                    onChange={(val) => setCaptchaValue(val)}
                                />
                                <Button
                                    type="submit"
                                    className="hover:bg-red-700 font-semibold gap-2 px-10"
                                    disabled={isSubmitted}
                                >
                                    Daftar
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </LayoutAuth>
    );
}
