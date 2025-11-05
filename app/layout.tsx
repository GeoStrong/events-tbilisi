import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import Header from "@/components/header/header";
import Container from "@/components/container/container";
import "./globals.css";
import Footer from "@/components/footer/footer";
import StoreProvider from "@/lib/store/storeProvider";

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
        <StoreProvider>
          <ThemeProvider attribute="class">
            <main className="flex min-h-screen flex-col">
              <Header />
              <Container>{children}</Container>
            </main>
            <Footer />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
