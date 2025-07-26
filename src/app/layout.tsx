import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { CartProvider } from "@/context/CartContext";
import MobileTabBar from "@/components/layout/MobileTabBar";

export const metadata: Metadata = {
  title: "MiniCom",
  description: "Mini E-commerce Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>
      <html lang="en">
        <body className="antialiased">
          <Header />
          {children}
          <Footer />
          <MobileTabBar />
        </body>
      </html>
    </CartProvider>
  );
}
