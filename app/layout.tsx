import type { Metadata } from "next";
import "./globals.css";
import HomeNav from "@/components/home-nav";

export const metadata: Metadata = {
  title: "Claire & Chase",
  description: "Claire & Chase's wedding",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ position: "relative" }}>
        <HomeNav />
        {children}
      </body>
    </html>
  );
}
