import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar'; // 使用路径别名

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: '每周作业平台',
  description: '使用 Next.js 和 Tailwind CSS 构建',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.className} bg-slate-50`}>
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}