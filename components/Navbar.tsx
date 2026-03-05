import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
    return (
        <nav className="w-full bg-background border-b border-border sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo Sowan */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-3xl font-bold text-primary tracking-tighter">
                            Sowan.id
                        </Link>
                    </div>

                    {/* Nav Links */}
                    <div className="hidden md:flex space-x-8 items-center">
                        <Link
                            href="/explore"
                            className="text-foreground hover:text-accent font-semibold transition-colors px-3 py-2 text-xl"
                        >
                            Cari Mentor
                        </Link>
                        <Link
                            href="/dashboard/mentor"
                            className="text-foreground hover:text-accent font-semibold transition-colors px-3 py-2 text-xl"
                        >
                            Jadwal Sowan
                        </Link>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-4">
                        <Button asChild variant="ghost" className="text-lg font-semibold md:flex hidden">
                            <Link href="/dashboard/mentor">
                                Masuk
                            </Link>
                        </Button>
                        <Button className="bg-accent hover:bg-accent/90 text-white text-lg font-bold px-6 py-6 shadow-md rounded-xl">
                            Daftar Sekarang
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
