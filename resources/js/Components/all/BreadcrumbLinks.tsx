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

export default function BreadcrumbLinks({
    basePath,
    pagePath,
}: {
    basePath: string;
    pagePath?: string;
}) {
    const currentPath = window.location.pathname.split("/").slice(1);
    const pathLoop = currentPath.slice(1, -1);

    let builtPath = basePath;

    return (
        <Breadcrumb className="mb-10">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/admin/dashboard">
                        <Home className="w-5 h-5" />
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                {pathLoop.map((path, i) => {
                    if (!isNaN(parseInt(path))) {
                        return;
                    }

                    builtPath += `/${path}`;

                    return (
                        <React.Fragment key={i}>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link
                                        href={builtPath}
                                        className="capitalize"
                                    >
                                        {path}
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            {i < currentPath.length - 1 && (
                                <BreadcrumbSeparator />
                            )}
                        </React.Fragment>
                    );
                })}
                <BreadcrumbItem>
                    <BreadcrumbPage className="bg-primary-bg capitalize text-primary py-1 px-2 rounded-md font-bold">
                        {pagePath
                            ? pagePath
                            : currentPath[currentPath.length - 1]}
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}
