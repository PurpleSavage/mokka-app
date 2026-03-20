import type { Metadata } from "next";
import { Arimo } from "next/font/google";
import "./globals.css";

const arimoSans = Arimo({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mokka",
  description: "Mokka is a tool that allows you to create and share voice samples for free. It is a great way to create and share your voice samples with others.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${arimoSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
