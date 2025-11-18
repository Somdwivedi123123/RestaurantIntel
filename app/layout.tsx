import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Restaurant Intelligence Platform",
  description: "AI-powered insights for restaurant management - competitive intelligence, dynamic pricing, and operational excellence",
  keywords: ["restaurant", "intelligence", "analytics", "AI", "management", "pricing", "competitive analysis"],
  authors: [{ name: "Restaurant Intel Team" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  themeColor: "#0ea5e9",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
