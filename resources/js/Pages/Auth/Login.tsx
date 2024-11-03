import LayoutAuth from "@/Layouts/LayoutAuth";
import {Head, Link, usePage} from "@inertiajs/react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import {SyntheticEvent, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/Components/ui/button";
import {Input} from "@/Components/ui/input";
import {ArrowLeft, Eye, EyeOff} from "lucide-react";
import axios from "axios";
import {toast} from 'react-hot-toast'
import {Checkbox} from "@/Components/ui/checkbox";

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    remember: z.boolean()
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function Login(
    {severity, message}: { severity: string | null; message: string }
) {

    useEffect(() => {
        if (severity && message) {
            // @ts-ignore
            toast[severity || error](message)
        }
    }, [])

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [errorStatus, seterrorStatus] = useState<string | null>(null);
    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            remember: false
        },
    });

    const {handleSubmit, control} = form;

    const submit = handleSubmit((values) => {
        setIsSubmitted(true)

        const promise = axios.post('/login', values);

        toast.promise(promise, {
            loading: "Loading...",
            success: () => {
                setIsSubmitted(false)
                window.location.replace('/mitra/dashboard')
                return "Login Success"
            },
            error: (err) => {
                setIsSubmitted(false)
                seterrorStatus(err?.response.status.toString())
                return err?.response.data.message || "Something went wrong!"
            }
        })
    });

    const sendVerificationEmail = async () => {
        const promise = axios.post('/email/verify', {email: form.getValues().email});

        toast.promise(promise, {
            loading: "Loading...",
            success: () => {
                return "Email verifikasi telah dikirim"
            },
            error: (err) => {
                return err?.response.data.message || "Something went wrong!"
            }
        })
    }

    return (
        <LayoutAuth>
            <Head title="Login"/>

            <div className="container">
                <div className="bg-white grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 border rounded-md">
                    <div className="px-5 sm:px-10 py-10 lg:py-14 space-y-5">
                        <Link
                            href="/"
                            className="text-primary px-0 flex items-center gap-1"
                        >
                            <ArrowLeft className="w-5 h-5"/>
                            Kembali ke halaman utama
                        </Link>
                        <div className="space-y-3">
                            <h1 className="font-bold text-3xl">
                                Selamat Datang
                            </h1>
                            <p className="text-sm text-[#344054]">
                                Silakan masukan email dan kata sandi untuk masuk
                                ke halaman dashboard Anda
                            </p>
                        </div>
                        <Button variant={"outline"} asChild>
                            <Link href="/register" className="flex gap-1">
                                <span className="text-[#344054]">
                                    Belum punya akun mitra?
                                </span>
                                <span className="text-primary">
                                    Registrasi di sini
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
                                    render={({field}) => (
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
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({field}) => (
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
                                                            <EyeOff className="w-5 h-5 text-[#344054]"/>
                                                        ) : (
                                                            <Eye className="w-5 h-5 text-[#344054]"/>
                                                        )}
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            {
                                                errorStatus === "403" && (
                                                    <p className="text-red-800 text-sm">
                                                        Email belum terverifikasi, cek email anda atau{" "}
                                                        <span onClick={sendVerificationEmail} className="cursor-pointer text-blue-500 underline">
                                                                Kirim ulang email verifikasi
                                                        </span>

                                                    </p>
                                                )
                                            }
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="remember"
                                    render={({field}) => (
                                        <FormItem className="flex items-center gap-2 space-y-0">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormLabel className="cursor-pointer">
                                                Remember Me
                                            </FormLabel>
                                        </FormItem>
                                    )}
                                />
                                <div className="w-full flex justify-end">
                                    <Button
                                        type="submit"
                                        className="hover:bg-red-700 font-semibold gap-2 px-10"
                                        disabled={isSubmitted}
                                    >
                                        Masuk
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </LayoutAuth>
    );
}
