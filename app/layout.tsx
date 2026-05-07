import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  applicationName: "Lumigo",
  title: {
    default: "Lumigo — Smart SAT Prep",
    template: "%s | Lumigo",
  },
  description:
    "Lumigo combines SAT practice tests, an AI tutor, and personalized analytics to help students study smarter.",
  keywords: ["Lumigo", "SAT prep", "AI tutor", "practice tests", "personalized analytics"],
  openGraph: {
    title: "Lumigo — Smart SAT Prep",
    description:
      "SAT practice tests, AI tutoring, and personalized analytics for focused study.",
    siteName: "Lumigo",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Lumigo — Smart SAT Prep",
    description:
      "SAT practice tests, AI tutoring, and personalized analytics for focused study.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"
          integrity="sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
