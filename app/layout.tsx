import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";

// Menggunakan Inter yang lebih bersih dan readable untuk lansia
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

// Font Serif premium untuk heading
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://sowan.id"),
  title: {
    default: "Sowan.id — Belajar Langsung dari Ahlinya",
    template: "%s · Sowan.id",
  },
  description:
    "Platform yang menghubungkan generasi muda dengan mentor lansia (sesepuh) berpengalaman untuk belajar bahasa dan budaya lewat sesi video call yang bermakna.",
  applicationName: "Sowan.id",
  keywords: [
    "sowan",
    "belajar budaya",
    "mentor lansia",
    "sesepuh",
    "bahasa jawa",
    "edutech",
    "kelas budaya online",
    "video call mentor",
  ],
  authors: [{ name: "Trio Capybara Gaje" }],
  creator: "Trio Capybara Gaje",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Sowan.id",
    title: "Sowan.id — Belajar Langsung dari Ahlinya",
    description: "Belajar budaya. Dari yang pernah hidup di dalamnya.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sowan.id — Belajar Langsung dari Ahlinya",
    description: "Belajar budaya. Dari yang pernah hidup di dalamnya.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <body className={`font-sans antialiased min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden`}>
        <LanguageProvider>
          <AuthProvider>
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

