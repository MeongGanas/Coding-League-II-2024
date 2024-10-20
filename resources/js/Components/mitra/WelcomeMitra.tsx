export default function WelcomeMitra() {
    return (
        <div className="bg-[url('/images/admin/dashboard_bg.png')] bg-cover bg-no-repeat bg-center w-full h-72 relative">
            <div className="h-full w-full bg-black/40 absolute top-0 left-0 flex items-center justify-center">
                <div className="text-white space-y-2 text-center">
                    <h1 className="font-bold text-2xl sm:text-3xl">
                        Selamat Datang di Dashboard CSR Kabupaten Cirebon
                    </h1>
                    <p className="text-base sm:text-xl text-light">
                        Lapor dan ketahui program CSR Anda
                    </p>
                </div>
            </div>
        </div>
    );
}
