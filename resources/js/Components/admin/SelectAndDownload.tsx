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
import { forwardRef } from "react";

const selectComponent = ({
    label,
    options,
    customKey,
    customValue,
    onValueChange,
}: {
    label: string;
    options?: string[] | { [key: string]: string };
    onValueChange: (label: string, value: string) => void;
    customKey?: string;
    customValue?: string;
}) => {
    return (
        <Select onValueChange={(value) => onValueChange(label, value)}
        >
            <SelectTrigger className="w-full">
                <SelectValue
                    placeholder={`Pilih ${
                        label.charAt(0).toUpperCase() + label.slice(1)
                    }`}
                />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup className="cursor-pointer">
                    <SelectItem value="clear">
                        Semua {label.charAt(0).toUpperCase() + label.slice(1)}
                    </SelectItem>
                    {options
                        ? Array.isArray(options)
                            ? options.map((key: string) => (
                                  <SelectItem value={key} key={key}>
                                      {key}
                                  </SelectItem>
                              ))
                            : Object.keys(options).map((key: string) => (
                                  <SelectItem value={key.toString()} key={key}>
                                      {options[key]}
                                  </SelectItem>
                              ))
                        : null}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

const kuartalOptions = {
    "1": "Kuartal 1 (Januari, Februari, Maret)",
    "2": "Kuartal 2 (April, Mei, Juni)",
    "3": "Kuartal 3 (Juli, Agustus, September)",
    "4": "Kuartal 4 (Oktober, November, Desember)",
};

export default function SelectAndDownload({
    tahun,
    tahunOptions,
    kuartal,
    sektor,
    mitra,
    sektors,
    mitras,
    menu,
}: {
    tahun?: boolean;
    tahunOptions?: string[];
    kuartal?: boolean;
    sektor?: boolean;
    mitra?: boolean;
    sektors?: Sektor[];
    mitras?: any[];
    menu: string;
}) {
    const params = new URLSearchParams(window.location.search);
    let paramchanged: boolean = false;

    console.log(tahunOptions);

    const handleParamSet = (param: string, value: string) => {
        paramchanged = true;
        if (value && value !== "clear") {
            params.set(param, value);
        } else {
            params.delete(param);
        }
    };

    const commitParams = () => {
        if (!paramchanged) return;
        params.delete("page");
        window.location.replace(
            `${window.location.pathname}?${params.toString()}`
        );
    };

    const newSektorOptions = () => {
        if (sektors) {
            return sektors.reduce((acc: any, sektor) => {
                acc[sektor.id] = sektor.name;
                return acc;
            }, {});
        }
        return {};
    };

    const newMitraOptions = () => {
        if (mitras) {
            return mitras.reduce((acc: any, mitra) => {
                acc[mitra.id] = mitra.name;
                return acc;
            }, {});
        }
        return {};
    }

    console.log(newSektorOptions());

    return (
        <div
            className={`grid grid-cols-2 md:grid-cols-4 ${
                tahun && kuartal && sektor && mitra
                    ? "xl:grid-cols-6"
                    : "xl:grid-cols-4"
            } gap-4 items-center`}
        >
            {tahun &&
                selectComponent({
                    label: "tahun",
                    options: tahunOptions,
                    onValueChange: handleParamSet,
                })}
            {kuartal &&
                selectComponent({
                    label: "kuartal",
                    options: kuartalOptions,
                    onValueChange: handleParamSet,
                })}
            {sektor &&
                selectComponent({
                    label: "sektor",
                    options: newSektorOptions(),
                    onValueChange: handleParamSet,
                })}
            {mitra && (
                selectComponent({
                    label: "mitra",
                    options: newMitraOptions(),
                    onValueChange: handleParamSet,
                })
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
