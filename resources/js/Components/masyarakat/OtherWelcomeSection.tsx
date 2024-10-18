import { ReactNode } from "react";
import BreadcrumLinksMasyarakat from "./BreadcrumbLinksMasyarakat";

export default function OtherWelcomeSection({ title, desc, anotherDesc, pagePath, addBreadCrumb, addBreadCrumbID }: { title: string, desc: string, pagePath?: string, addBreadCrumb?: string, addBreadCrumbID?: string, anotherDesc?: ReactNode }) {
    return (
        <div className="relative">
            <div className="py-10">
                <div className="w-[40%] bg-primary-darker absolute h-full top-0"></div>
                <div className="container">
                    <div className="bg-[url('/images/masyarakat/welcome.png')] bg-cover bg-no-repeat bg-center w-full h-[400px] relative">
                        <div className="h-full w-full bg-black/70 absolute top-0 left-0 flex items-center gap-5 px-5 md:px-10 pt-10">
                            <div className="text-white space-y-2 w-full">
                                <BreadcrumLinksMasyarakat basePath="" pagePath={pagePath} addBreadCrumb={addBreadCrumb} addBreadCrumbID={addBreadCrumbID} />
                                <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl capitalize">
                                    {title}
                                </h1>
                                <p className="lg:text-lg text-light">
                                    {desc}
                                </p>
                                {anotherDesc}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}