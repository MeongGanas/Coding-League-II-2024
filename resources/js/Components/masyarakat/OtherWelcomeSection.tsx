import BreadcrumLinksMasyarakat from "./BreadcrumbLinksMasyarakat";

export default function OtherWelcomeSection() {
    return (
        <div className="relative">
            <div className="py-10">
                <div className="w-[40%] bg-primary-darker absolute h-full top-0"></div>
                <div className="container">
                    <div className="bg-[url('/images/masyarakat/welcome.png')] bg-cover bg-no-repeat bg-center w-full h-[400px] relative">
                        <div className="h-full w-full bg-black/60 absolute top-0 left-0 flex items-center gap-5 px-5 md:px-10 pt-10">
                            <div className="text-white space-y-2 w-full">
                                <BreadcrumLinksMasyarakat basePath="/" />
                                <h1 className="font-bold text-5xl md:text-5xl lg:text-6xl capitalize">
                                    tentang
                                </h1>
                                <p className="text-base sm:text-lg lg:text-xl text-light">
                                    Tentang CSR Kabupaten Cirebon
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}