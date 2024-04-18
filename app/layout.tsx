import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Free LSAT Explanations | TutorRX",
  description: "Free LSAT Explanations provided by TutorRX. Get explanations for every LSAT question from PrepTests 1-93.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children} <Analytics /> <SpeedInsights /> </body>
    </html>
  );
}
