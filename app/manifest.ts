import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sowan.id — Belajar Langsung dari Ahlinya",
    short_name: "Sowan.id",
    description:
      "Platform yang menghubungkan generasi muda dengan mentor lansia (sesepuh) berpengalaman untuk belajar bahasa & budaya lewat sesi video call yang bermakna.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF9F6",
    theme_color: "#1A365D",
    icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
