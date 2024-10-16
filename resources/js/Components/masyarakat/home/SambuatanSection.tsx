import Garis from "../Garis";

export default function SambutanSection() {
    return (
        <div className="py-20">

            <div className="relative">
                <img src="/images/masyarakat/hiasan.png" width={100} alt="hiasan" className="absolute left-0 top-0 -z-10" />
                <div className="container space-y-5 md:space-y-0 px-5 md:px-0">
                    <div className="grid lg:grid-cols-2 items-center space-y-16 lg:space-y-0">
                        <div className="space-y-5 pl-5">
                            <Garis />
                            <h1 className="font-extrabold text-3xl lg:text-4xl">Sambutan Bupati <span className="block">Kabupaten Cirebon</span></h1>
                            <div className="pl-3 space-y-5">
                                <p>
                                    Elit sit vitae nulla porttitor nulla platea lectus ultrices cursus. Proin mi nisi mi sed amet. Aliquam sit sed turpis ut sociis consequat nibh enim malesuada. Eget vestibulum volutpat cursus enim. Urna maecenas at sed dignissim augue aliquam. In diam condimentum ultricies sit proin egestas. Nunc eget quisque vestibulum vestibulum quisque ipsum gravida malesuada. Tempor quis arcu sociis non ut praesent mi id sit. Platea cursus diam sit vitae enim aliquet aliquam arcu.
                                </p>
                                <p>
                                    Posuere malesuada vehicula nunc adipiscing senectus. Leo sodales placerat enim at porttitor lacinia. Sagittis viverra eu nunc velit. Euismod aliquet ullamcorper felis et ante egestas. Venenatis faucibus ultrices morbi id tempus morbi. Lacus at quis tempus at nunc sed aliquam. Scelerisque id fames pellentesque euismod. Mollis egestas mi tristique ipsum.
                                </p>
                                <div className="space-y-3">
                                    <h1 className="font-bold text-xl md:text-2xl">Drs. H. Imron Rosyadi, Lc., M.Ag., M.M.</h1>
                                    <p>Bupati Kabupaten Cirebon</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-full pl-5">
                            <div className="w-full h-full bg-slate-100 hidden xl:block"></div>
                            <img src="/images/masyarakat/sambutan.png" className="mx-auto xl:hidden" alt="sambutan" />
                        </div>
                        <img src="/images/masyarakat/sambutan.png" className="xl:absolute xl:right-0 xl:bottom-0 hidden xl:block" alt="sambutan" />
                    </div>
                </div>
            </div>
        </div>
    )
}