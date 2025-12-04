import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Footer from "@/components/footer/footer";
import StoreProvider from "@/lib/store/storeProvider";
import MainLayout from "@/components/general/mainLayout";
import ProgressiveBarProvider from "@/components/general/progressiveBarProvider";

const myFont = localFont({
  src: "../public/fonts/GT-Walsheim-Regular-Trial.woff2",
  style: "normal",
  weight: "400",
  variable: "--font-myFont",
});

export const metadata: Metadata = {
  title: "What’sOnTbilisi",
  description: "Every event. Every Tbilisi resident",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${myFont.variable} antialiased`}>
        <ProgressiveBarProvider>
          <StoreProvider>
            <ThemeProvider attribute="class" enableSystem defaultTheme="system">
              <main className="flex min-h-[90vh] flex-col">
                <MainLayout>{children}</MainLayout>
              </main>
              <Footer />
            </ThemeProvider>
          </StoreProvider>
        </ProgressiveBarProvider>
      </body>
    </html>
  );
}
