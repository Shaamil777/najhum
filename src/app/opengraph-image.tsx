import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "Najhum Technologies LLC — Intelligent connected infrastructure";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = await readFile(path.join(process.cwd(), "public/logo/logo.png"));
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "72px 86px", background: "#f8fbff", color: "#0b1b33", fontFamily: "sans-serif", position: "relative" }}>
      <div style={{ position: "absolute", top: -150, right: -110, width: 580, height: 580, border: "85px solid #dbeafe", borderRadius: "50%", display: "flex" }} />
      <img src={`data:image/png;base64,${logo.toString("base64")}`} width={430} height={116} alt="Najhum" style={{ objectFit: "contain", marginBottom: 46 }} />
      <div style={{ display: "flex", flexDirection: "column", fontSize: 66, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2 }}><span>Intelligent connected</span><span style={{ color: "#167de4" }}>infrastructure.</span></div>
      <div style={{ display: "flex", fontSize: 23, color: "#64748b", marginTop: 26 }}>Industrial IoT · EV charging · Smart agriculture</div>
      <div style={{ display: "flex", fontSize: 18, color: "#167de4", marginTop: 35 }}>najhumgroup.com</div>
    </div>,
    { ...size },
  );
}
