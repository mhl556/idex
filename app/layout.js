import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from './components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: '每周作业平台',
  description: '使用 Next.js 和 Tailwind CSS 构建',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}