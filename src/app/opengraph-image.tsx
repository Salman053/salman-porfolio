import { ImageResponse } from "next/og";

export const alt = "Muhammad Salman Khan — Full-Stack Web Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          background: "linear-gradient(135deg, #05070f 0%, #0a0f1e 55%, #111a33 100%)",
          position: "relative",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Decorative glow orb */}
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -180,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(245,197,66,0.28) 0%, rgba(245,197,66,0) 70%)",
          }}
        />
        {/* Bottom amber accent bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            height: 10,
            background: "linear-gradient(90deg, #f5c542 0%, #f5c542 35%, rgba(245,197,66,0) 100%)",
          }}
        />

        {/* Left column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "68%",
            paddingRight: 48,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              color: "#f5c542",
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              marginBottom: 22,
            }}
          >
            <div style={{ width: 44, height: 3, background: "#f5c542" }} />
            Portfolio · 2026
          </div>

          <div
            style={{
              color: "#ffffff",
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Muhammad
          </div>
          <div
            style={{
              color: "#ffffff",
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              marginBottom: 18,
            }}
          >
            Salman Khan
          </div>

          <div
            style={{
              color: "#f5c542",
              fontSize: 34,
              fontWeight: 700,
              marginBottom: 26,
            }}
          >
            Full-Stack Web Developer
          </div>

          <div
            style={{
              color: "#9aa7c7",
              fontSize: 24,
              lineHeight: 1.4,
              marginBottom: 34,
            }}
          >
            Next.js · React · TypeScript · Node.js · Tailwind CSS
          </div>

          <div style={{ color: "#5b6785", fontSize: 19, letterSpacing: 1 }}>
            github.com/Salman053
          </div>
        </div>

        {/* Right column: code glyph card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "32%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: 280,
              height: 320,
              borderRadius: 28,
              border: "3px solid rgba(245,197,66,0.55)",
              background: "rgba(245,197,66,0.06)",
              boxShadow: "0 0 80px rgba(245,197,66,0.15)",
            }}
          >
            <div
              style={{
                color: "#f5c542",
                fontSize: 128,
                fontWeight: 800,
                letterSpacing: -4,
                lineHeight: 1,
              }}
            >
              {"</>"}
            </div>
            <div
              style={{
                color: "#9aa7c7",
                fontSize: 18,
                letterSpacing: 3,
                marginTop: 22,
                textTransform: "uppercase",
              }}
            >
              Build · Ship · Scale
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
