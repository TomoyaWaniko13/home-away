import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Providers from "@/app/Providers";
import { ClerkProvider } from "@clerk/nextjs";

// 54. Navbar Structure
// 57. Setup Dark Mode with Shadcn/ui
// 59. Setup and Customize Clerk Auth Provider

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
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning={true}>
        <body>
          <Providers>
            <Navbar />
            <main className={"container py-10"}>{children}</main>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
