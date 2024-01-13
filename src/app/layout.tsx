import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Noto_Naskh_Arabic } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

import ThemeProvider from "@/providers/theme-provider";
import "./globals.css";
import { siteConfig } from "@/config/site";
import Background from "./background";
import { Toaster } from "@/components/ui/sonner";
import { useTheme } from "@/hooks/use-theme";
import { useEffect } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const persian = Noto_Naskh_Arabic({
  weight: ["400", "500", "600", "700"],
  subsets: ["arabic"],
  variable: "--font-rubik",
});

// const persian = localFont({
//   src: "../../public/fonts/BNazanin.woff",
//   variable: "--font-persian",
// });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: [
    {
      url: "/logo.svg",
      href: "/logo.svg",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <body
          className={`${inter.variable} ${persian.variable} font-mono bg-background`}
        >
          {children}
          <SpeedInsights />
          <Toaster />
        </body>
      </ThemeProvider>
    </html>
  );
}
