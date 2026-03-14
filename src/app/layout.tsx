import type { Metadata } from "next";
import { Geist, Geist_Mono, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Messaging from "@/components/messaging";

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '600', '700'], 
  variable: '--font-source-sans',
  
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Linkedin",
  description: "Linkedin home page clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${sourceSans.variable} antialiased`}
      >
        {children}
        <Messaging />
      </body>
    </html>
  );
}
