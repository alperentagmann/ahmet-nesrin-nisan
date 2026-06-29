import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Great_Vibes } from "next/font/google";
import "./globals.css";
import ParticleLayer from "./components/ParticleLayer";

const cinzel = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const greatVibes = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Nesrin & Ahmet Burak",
  description: "Sizi düğünümüze davet etmekten mutluluk duyuyoruz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${cinzel.variable} ${cormorant.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ParticleLayer />
        {children}
      </body>
    </html>
  );
}

