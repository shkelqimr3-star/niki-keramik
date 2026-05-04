import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Niki Keramik - Pllaka, banjo dhe ujësjellës",
  description:
    "Niki Keramik realizon pllaka, renovim banjoje, ujësjellës, instalime sanitare dhe punime të jashtme në Luginë të Preshevës dhe Bujanoc.",
  openGraph: {
    title: "Niki Keramik",
    description: "Pllaka, banjo, ujësjellës dhe punime të jashtme.",
    images: ["/images/niki-keramik-projects.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sq">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
