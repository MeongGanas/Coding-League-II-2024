import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Link } from "@inertiajs/react";
import { Home } from "lucide-react";
import React from "react";

export default function BreadcrumLinksMasyarakat({
    basePath,
    pagePath,
    textWhite,
}: {
    basePath: string;
    pagePath?: string;
    textWhite?: boolean;
}) {
    const currentPath = window.location.pathname.split("/").slice(1);
    const pathLoop = currentPath.slice(1, -1);

    let builtPath = basePath;

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/admin/dashboard" className="text-[#E66445] hover:text-red-200 text-base">
                        Beranda
                    </BreadcrumbLink>
                </BreadcrumbItem>
                {pathLoop.map((path, i) => {
                    if (!isNaN(parseInt(path))) {
                        return;
                    }

                    builtPath += `/${path}`;

                    return (
                        <React.Fragment key={i}>
                            {i < currentPath.length - 1 && (
                                <span className="text-[#E66445]">/</span>
                            )}
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link
                                        href={builtPath}
                                        className={`capitalize ${textWhite
                                            ? "text-white hover:text-primary-bg"
                                            : ""
                                            }`}
                                    >
                                        {path}
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </React.Fragment>
                    );
                })}
                <span className="text-white">/</span>
                <BreadcrumbItem>
                    <BreadcrumbPage className="text-white capitalize text-base">
                        {pagePath
                            ? pagePath
                            : currentPath[currentPath.length - 1]}
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}
