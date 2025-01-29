import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import Header from "@/components/header/header";
import Container from "@/components/container/container";
import "./globals.css";
import Footer from "@/components/footer/footer";

const myFont = localFont({
  src: "../public/fonts/GT-Walsheim-Regular-Trial.woff2",
  style: "normal",
  weight: "400",
  variable: "--font-myFont",
});

export const metadata: Metadata = {
  title: "Events Tbilisi",
  description: "Events in Tbilisi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${myFont.variable} antialiased`}>
        <ThemeProvider attribute="class">
          <Header />
          <Container>{children}</Container>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
