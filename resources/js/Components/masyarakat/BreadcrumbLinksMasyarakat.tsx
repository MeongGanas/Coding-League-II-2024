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
    addBreadCrumb,
    addBreadCrumbID
}: {
    basePath: string;
    pagePath?: string;
    addBreadCrumb?: string;
    addBreadCrumbID?: string;
}) {
    const currentPath = window.location.pathname.split("/").slice(1);
    const pathLoop = currentPath.slice(0, -1);

    let builtPath = basePath;

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/" className="text-[#E66445] hover:text-red-200 text-base">
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
                            {i < pathLoop.length && (
                                <span className="text-[#E66445]">/</span>
                            )}
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link
                                        href={builtPath}
                                        className={`text-[#E66445] capitalize hover:text-red-200 text-base`}
                                    >
                                        {path}
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </React.Fragment>
                    );
                })}
                {addBreadCrumb && (
                    <>
                        <span className="text-[#E66445]">/</span>

                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link
                                    href={`/sektor/${addBreadCrumbID}/detail`}
                                    className={`text-[#E66445] capitalize hover:text-red-200 text-base`}
                                >
                                    {addBreadCrumb}
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </>
                )}

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
