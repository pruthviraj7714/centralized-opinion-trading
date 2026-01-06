import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "OpinionX | Trade Opinions in Real Time",
    template: "%s | OpinionX",
  },
  description:
    "OpinionX is a centralized opinion trading platform where users trade YES/NO outcomes on real-world events using an orderbook-based matching engine.",
  keywords: [
    "opinion trading",
    "prediction market",
    "event trading",
    "yes no trading",
    "centralized exchange",
    "trading platform",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
          <Footer />
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
