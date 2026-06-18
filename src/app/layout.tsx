import type { Metadata } from "next";
import { Inter, Archivo_Black } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
      suppressHydrationWarning
    >
      <head>
      </head>
      <body className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
          <div className="noise-overlay" />
          <Cursor />
          <SmoothScroll>
            <Navbar />
            <main className="relative block">{children}</main>
            <Footer />
          </SmoothScroll>
      </body>
    </html>
  );
}
