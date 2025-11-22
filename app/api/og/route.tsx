import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Optional parameters
    const title = searchParams.get("title") || "Sygill";
    const locale = searchParams.get("locale") || "en";
    const type = searchParams.get("type") || "default";

    // Icon URL (adjust based on your project)
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const iconUrl = `${baseUrl}/icon.png`;

    // Gradient colors (Golden/Amber theme)
    const colors = {
      primary: "#d97706", // Amber 600
      secondary: "#92400e", // Amber 800
      dark: "#0c0a09", // Dark background
      light: "#fafaf9", // Light text
    };

    // Badge based on type (optional)
    let badge = "";
    if (type === "blog") {
      badge = locale === "es" ? "📝 Blog" : "📝 Blog";
    } else if (type === "resource") {
      badge = locale === "es" ? "📚 Recurso" : "📚 Resource";
    }

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.primary} 50%, ${colors.secondary} 100%)`,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          {/* Centered Icon */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={iconUrl}
            alt="Icon"
            width="200"
            height="200"
            style={{
              objectFit: "contain",
            }}
          />

          {/* Site Name */}
          <div
            style={{
              marginTop: 30,
              fontSize: 48,
              fontWeight: "700",
              color: colors.light,
              textShadow: "0 2px 10px rgba(0,0,0,0.5)",
            }}
          >
            Sygill
          </div>

          {/* Optional Badge (bottom right) */}
          {badge && (
            <div
              style={{
                position: "absolute",
                bottom: 40,
                right: 40,
                background: "rgba(0, 0, 0, 0.7)",
                color: colors.light,
                padding: "12px 24px",
                borderRadius: "8px",
                fontSize: 24,
                fontWeight: "600",
              }}
            >
              {badge}
            </div>
          )}
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          "cache-control": "public, max-age=31536000, immutable",
          "content-type": "image/png",
        },
      }
    );
  } catch (error) {
    console.error("Error generating OG image:", error);
    return new Response("Failed to generate image", { status: 500 });
  }
}
