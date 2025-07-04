import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "../components/Footer"; // 导入 Footer 组件
import Navbar from "./components/Navbar"; // 1. 导入 Navbar 组件

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar /> {/* 2. 在这里添加 Navbar 组件 */}
        {children}
        <Footer /> {/* 在这里添加 Footer 组件 */}
      </body>
    </html>
  );
}
