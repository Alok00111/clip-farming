import type { Metadata } from "next";
import { Inter, Archivo_Black } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "ClippingAgency | Premium Short-Form Content",
  description: "We turn your long-form content into viral short clips, distributed by a network of clippers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${archivoBlack.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
        <div className="noise-overlay" />
        <Cursor />
        <SmoothScroll>
          <main className="relative block">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
