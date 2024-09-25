import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Providers from "@/app/Providers";

// 54. Navbar Structure
// 57. Setup Dark Mode with Shadcn/ui

export const metadata: Metadata = {
  title: "HomeAway",
  description: "Feel at home, away from home.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <Providers>
          <Navbar />
          <main className={"container py-10"}>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
