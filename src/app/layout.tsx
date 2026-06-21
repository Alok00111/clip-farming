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
  metadataBase: new URL('https://clipupmedia.xyz'),
  title: {
    default: "Clip Up Media | Elite Short-Form Content Agency",
    template: "%s | Clip Up Media",
  },
  description: "We turn your long-form videos into viral short-form clips. Join our network of elite editors or hire us to scale your content on TikTok, Reels, and Shorts.",
  keywords: ["short form content", "tiktok editing agency", "video editors", "clip farming", "content scale"],
  openGraph: {
    title: "Clip Up Media | Elite Short-Form Content Agency",
    description: "We turn your long-form videos into viral short-form clips.",
    url: "https://clipupmedia.xyz",
    siteName: "Clip Up Media",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clip Up Media | Elite Short-Form Content Agency",
    description: "We turn your long-form videos into viral short-form clips.",
  },
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
