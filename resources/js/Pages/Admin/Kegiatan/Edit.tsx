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
import { KeyboardEvent, SyntheticEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { CloudUpload, Send, X } from "lucide-react";
import { Kegiatan, PageProps } from "@/types";
import { Editor } from '@tinymce/tinymce-react';

const kegiatanSchema = z.object({
    judul: z.string(),
    tags: z.array(z.string()).min(1, { message: "Minimal terdapat 1 tags" }),
    image: z
        .instanceof(FileList).optional(),
});

type KegiatanSchema = z.infer<typeof kegiatanSchema>;


export default function Edit({ auth: { user }, notifications, kegiatan }: PageProps<{ notifications: any, kegiatan: Kegiatan }>) {
    const [preview, setPreview] = useState<string | null>(`/storage/${kegiatan.image}`);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [deskripsi, setDeskripsi] = useState(kegiatan.deskripsi);
    const [tags, setTags] = useState<string[]>(kegiatan.tags);

    const handleEditorChange = (newContent: string) => {
        setDeskripsi(newContent);
    };

    const form = useForm<KegiatanSchema>({
        resolver: zodResolver(kegiatanSchema),
        defaultValues: {
            judul: kegiatan.name,
            tags: kegiatan.tags
        },
    });

    const { handleSubmit, control, setValue } = form;

    const fileRef = form.register("image");

    const submit = handleSubmit((values) => {
        const data = { ...values, deskripsi };
        console.log(data)
    });

    const handlePreview = (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const addTag = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            const target = e.target as HTMLInputElement;
            const newTag = target.value.trim();

            if (newTag && !tags.includes(newTag)) {
                const currentTags = [...tags, newTag];
                setTags(currentTags);
                setValue("tags", currentTags)

                target.value = '';
            }
        }
    };



    const removeTag = (index: number) => {
        const updatedTags = tags.filter((_, i) => i !== index);
        setTags(updatedTags);
        setValue("tags", updatedTags);
    };

    return (
        <LayoutAdmin user={user} notifications={notifications}>
            <Head title="Buat Kegiatan" />
            <div className="container px-5 py-10">
                <div className="mb-10">
                    <BreadcrumbLinks
                        basePath="/admin"
                        pagePath="Ubah Kegiatan"
                    />
                </div>
                <h1 className="font-bold text-2xl mb-5">Ubah Kegiatan</h1>

                <Form {...form}>
                    <form onSubmit={submit} className="space-y-5">
                        <div className="bg-white rounded-md p-6 space-y-5 border">
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold text-base">
                                            Foto Thumbnail{" "}
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
                                                            className="w-60 mb-3"
                                                        />
                                                    )}
                                                    <div className="rounded-full border-4 mb-2 bg-[#FFDDDC] border-[#FFF1F0] text-primary p-2">
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
                                name="judul"
                                render={({ field }) => (
                                    <FormItem className="grid gap-2">
                                        <FormLabel className="font-bold text-base">
                                            Judul Kegiatan{" "}
                                            <span className="text-red-800">
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                required
                                                placeholder="Masukan Judul Kegiatan"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="tags"
                                render={({ field }) => (
                                    <FormItem className="grid gap-2">
                                        <FormLabel className="font-bold text-base">
                                            Tags{" "}
                                            <span className="text-red-800">
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <div className="flex border rounded-md items-center overflow-hidden">
                                                {tags.length > 0 && (
                                                    <div className="px-2 flex items-center gap-2">
                                                        {tags.map((tag, i) => (
                                                            <div className="flex h-fit bg-blue-900 py-1 px-2 text-sm text-white rounded-md items-center gap-2" key={i}>
                                                                <span>{tag}</span>
                                                                <X className="w-4 h-4 cursor-pointer" onClick={() => removeTag(i)} />
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                                <Input
                                                    className="border-none rounded-none focus-visible:ring-0 "
                                                    placeholder="Masukan Tags Kegiatan"
                                                    onKeyDown={addTag}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormItem>
                                <FormLabel className="font-bold text-base">
                                    Deskripsi{" "}
                                    <span className="text-red-800">
                                        *
                                    </span>
                                </FormLabel>
                                <FormControl>
                                    <Editor
                                        apiKey='asfqgxcvcom3cj3gly6w5io6rbk2lade6yhcqehdpup4rf9k'
                                        value={deskripsi}
                                        onEditorChange={handleEditorChange}
                                        init={{
                                            height: 300,
                                            menubar: false,
                                            plugins: [
                                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                            ],
                                            toolbar: 'undo redo | blocks | ' +
                                                'bold italic forecolor | alignleft aligncenter ' +
                                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                                'removeformat | help',
                                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </div>
                        <div className="bg-white p-4 rounded-md border flex justify-end items-center gap-4">
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
