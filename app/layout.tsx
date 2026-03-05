import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";

// Menggunakan Inter yang lebih bersih dan readable untuk lansia
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

// Font Serif premium untuk heading
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "Sowan.id - Belajar Langsung dari Ahlinya",
  description: "Platform Sowan untuk menghubungkan generasi muda dengan lansia berpengalaman",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <body className={`font-sans antialiased min-h-screen flex flex-col bg-[#FAF9F6] text-[#1A365D]`}>
        <AuthProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}

