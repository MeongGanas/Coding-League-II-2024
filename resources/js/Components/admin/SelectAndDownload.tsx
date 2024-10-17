// TODO: ini tahun gabisa di set cuk
// CEK CLAUDE, kekna sudahka tanya tdi
// PENGINGAT JI INI

import { Button } from "@/Components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import DownloadButtons from "./DownloadButtons";
import { Sektor } from "@/types";
import { useEffect, useRef, useState } from "react";

export default function SelectAndDownload({
    tahun,
    tahunOptions,
    kuartal,
    sektor,
    mitra,
    sektors,
    menu

}: {
    tahun?: boolean;
    tahunOptions?: string[];
    kuartal?: boolean;
    sektor?: boolean;
    mitra?: boolean;
    sektors?: Sektor[];
    menu: string;
}) {
    const params = new URLSearchParams(window.location.search);
    let paramChanged = false

    const handleParamSet = (param: string, value: string) => {
        paramChanged = true
        if (value) {
            params.set(param, value);
        } else {
            params.delete(param);
        }
    }

    const commitParams = () => {
        if (!paramChanged) {
            window.location.replace(window.location.pathname);
            return;
        }

        window.location.replace(
            `${window.location.pathname}?${params.toString()}`
        );
    }

    return (
        <div
            className={`grid grid-cols-2 md:grid-cols-4 ${tahun && kuartal && sektor && mitra
                ? "xl:grid-cols-6"
                : "xl:grid-cols-4"
                } gap-4 items-center`}
        >
            {tahun && (
                <Select
                    onValueChange={(value) => handleParamSet("tahun", value)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Tahun" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {
                                tahunOptions && tahunOptions.map(tahun => (
                                    <SelectItem value={tahun} key={tahun}>{tahun}</SelectItem>
                                ))
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
            )}
            {kuartal && (
                <Select
                onValueChange={
                    (value) => handleParamSet("kuartal", value)
                }
                defaultValue={
                    params.get("kuartal") || ""
                }
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Kuartal" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="1">
                                Kuartal 1 (Januari, Februari, Maret)
                            </SelectItem>
                            <SelectItem value="2">
                                Kuartal 2 (April, Mei, Juni)
                            </SelectItem>
                            <SelectItem value="3">
                                Kuartal 3 (Juli, Agustus, September)
                            </SelectItem>
                            <SelectItem value="4">
                                Kuartal 4 (Oktober, November, Desember)
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            )}
            {sektor && (
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Sektor" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="semua" defaultChecked>Semua Sektor</SelectItem>
                            {sektors && sektors.map(sektor => (
                                <SelectItem value={sektor.id.toString()} key={sektor.id}>{sektor.name}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            )}
            {mitra && (
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Mitra" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="semua">Semua Mitra</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            )}
            <div className="col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-5">
                <Button
                    onClick={commitParams}
                    className="bg-primary border-primary hover:bg-red-700"
                    type="submit"
                >
                    Terapkan Filter
                </Button>
                <DownloadButtons menu={menu} />
            </div>
        </div>
    );
}
