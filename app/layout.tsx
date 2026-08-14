import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "JARVIS. Clip That.", description: "Explore Gaussian splats stored in Cloudflare R2." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
