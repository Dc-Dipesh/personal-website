import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The display face is vendored as TTF: satori cannot parse woff2, and a build
 * should not depend on a font CDN being reachable.
 */
async function loadDisplayFont(): Promise<Buffer | null> {
  try {
    return await readFile(join(process.cwd(), "src/app/fonts/InstrumentSerif-Regular.ttf"));
  } catch {
    return null;
  }
}

export default async function Image() {
  const font = await loadDisplayFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08080a",
          backgroundImage:
            "radial-gradient(60% 55% at 78% 22%, rgba(200,168,118,0.20), transparent 70%), radial-gradient(45% 45% at 12% 88%, rgba(110,123,255,0.16), transparent 72%)",
          padding: "72px 80px",
          color: "#edebe6",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#8a8781",
          }}
        >
          <span>{profile.title}</span>
          <span>{profile.location}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: font ? "Display" : undefined,
              fontSize: 132,
              lineHeight: 0.92,
              letterSpacing: -2,
            }}
          >
            <span>{profile.firstName}</span>
            <span>{profile.lastName}</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 34,
              color: "#c8a876",
              fontFamily: font ? "Display" : undefined,
            }}
          >
            Building experiences, not just interfaces.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(237,235,230,0.14)",
            paddingTop: 26,
            fontSize: 20,
            letterSpacing: 3,
            color: "#8a8781",
          }}
        >
          <span>React · Next.js · TypeScript · Web3</span>
          <span>dipeshchaulagain.com.np</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: font
        ? [{ name: "Display", data: font, style: "normal" as const, weight: 400 as const }]
        : [],
    },
  );
}
