"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
    const { user, login, logout } = useAuth();

    const handleLogin = () => {
        const name = window.prompt("Masukkan nama Anda untuk masuk:");
        if (name && name.trim() !== "") {
            login(name.trim());
        }
    };

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
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <span className="font-semibold text-lg">Halo, {user.name}</span>
                                <Button onClick={logout} variant="outline" className="text-lg font-semibold text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                                    Keluar
                                </Button>
                            </div>
                        ) : (
                            <>
                                <Button onClick={handleLogin} variant="ghost" className="text-lg font-semibold md:flex hidden">
                                    Masuk
                                </Button>
                                <Button onClick={handleLogin} className="bg-accent hover:bg-accent/90 text-white text-lg font-bold px-6 py-6 shadow-md rounded-xl">
                                    Daftar Sekarang
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
