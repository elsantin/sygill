import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Mist } from "@/components/layout/Mist";
import { generatePageMetadata } from "@/lib/metadata-utils";

const cinzel = Cinzel({
  variable: "--font-heading",
  subsets: ["latin"],
});
const cormorant = Cormorant_Garamond({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: "Sygill - The Ancient Grimoire of Knowledge",
    description:
      "A mystical knowledge base for mastering concepts through spaced repetition and ancient wisdom.",
  });
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${cinzel.variable} ${cormorant.variable} antialiased font-body`}
      >
        <ThemeProvider defaultTheme="dark" storageKey="sygill-theme">
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8">
              {children}
            </main>
            <Footer />
            <Mist />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
