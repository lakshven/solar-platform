import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.brightgridenergy.co.uk"),
  title: "BrightGrid Energy — Solar, Battery, EV & Heat Pumps",
  description:
    "Solar solutions for businesses.",
  alternates: { canonical: "/" },
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
   openGraph: {
    title: "BrightGrid Energy — Solar, Battery, EV & Heat Pumps",
    description:
      "Solar, battery storage, EV charging and renewable energy solutions for businesses.",
    url: "https://www.brightgridenergy.co.uk",
    siteName: "BrightGrid Energy",
    type: "website",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "BrightGrid Energy",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "BrightGrid Energy — Solar, Battery, EV & Heat Pumps",
    description:
      "Solar, battery storage, EV charging and renewable energy solutions for businesses.",
    images: ["/logo.svg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
