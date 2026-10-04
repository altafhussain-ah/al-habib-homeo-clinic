import { ImageResponse } from "next/og";
import { clinic } from "@/data/clinic";

const size = { width: 1200, height: 630 };

export const dynamic = "force-static";

/** Social sharing card, generated at build time and served at /og-image. */
export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#112e47",
          color: "#f7fafb",
        }}
      >
        <div style={{ fontSize: 30, color: "#7fc4cc", letterSpacing: 4 }}>HOMEOPATHIC CLINIC</div>
        <div style={{ fontSize: 66, fontWeight: 700, marginTop: 16 }}>{clinic.name}</div>
        <div style={{ fontSize: 36, marginTop: 24, color: "#d9eef0" }}>
          {`${clinic.address.area}, ${clinic.address.city}`}
        </div>
        <div style={{ fontSize: 36, marginTop: 12, color: "#d9eef0" }}>{`Open ${clinic.hours.display}`}</div>
      </div>
    ),
    size,
  );
}
