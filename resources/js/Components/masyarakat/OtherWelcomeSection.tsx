import BreadcrumLinksMasyarakat from "./BreadcrumbLinksMasyarakat";

export default function OtherWelcomeSection({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="relative">
            <div className="py-10">
                <div className="w-[40%] bg-primary-darker absolute h-full top-0"></div>
                <div className="container">
                    <div className="bg-[url('/images/masyarakat/welcome.png')] bg-cover bg-no-repeat bg-center w-full h-[400px] relative">
                        <div className="h-full w-full bg-black/70 absolute top-0 left-0 flex items-center gap-5 px-5 md:px-10 pt-10">
                            <div className="text-white space-y-2 w-full">
                                <BreadcrumLinksMasyarakat basePath="/" />
                                <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl capitalize">
                                    {title}
                                </h1>
                                <p className="lg:text-lg text-light">
                                    {desc}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}