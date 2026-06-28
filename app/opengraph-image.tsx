import { ImageResponse } from "next/og";

export const alt = "Sowan.id — Belajar Langsung dari Ahlinya";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#1A365D",
          padding: "80px",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              backgroundColor: "#D97706",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 40,
              fontWeight: 700,
            }}
          >
            S
          </div>
          <div style={{ fontSize: 40, color: "white", fontWeight: 700 }}>
            Sowan.id
          </div>
        </div>
        <div
          style={{ fontSize: 76, color: "white", fontWeight: 800, lineHeight: 1.1 }}
        >
          Belajar Langsung
        </div>
        <div
          style={{
            fontSize: 76,
            color: "#D97706",
            fontWeight: 800,
            lineHeight: 1.1,
            fontStyle: "italic",
          }}
        >
          dari Ahlinya
        </div>
        <div
          style={{
            fontSize: 30,
            color: "rgba(255,255,255,0.7)",
            marginTop: 32,
          }}
        >
          Belajar budaya. Dari yang pernah hidup di dalamnya.
        </div>
      </div>
    ),
    { ...size }
  );
}
