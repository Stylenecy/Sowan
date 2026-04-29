import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import ScaleProvider from "@/components/ScaleProvider";

// Menggunakan Inter yang lebih bersih dan readable untuk lansia
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

// Font Serif premium untuk heading
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "Sowan.id - Belajar Langsung dari Ahlinya",
  description: "Platform Sowan untuk menghubungkan generasi muda dengan lansia berpengalaman",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <body className={`font-sans antialiased min-h-screen flex flex-col bg-[#FAF9F6] text-[#1A365D] overflow-x-hidden`}>
        <LanguageProvider>
          <AuthProvider>
            <ScaleProvider>
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
            </ScaleProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

