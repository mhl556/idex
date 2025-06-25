import Link from 'next/link';

function Navbar() {
  return (
    <nav className="bg-slate-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold hover:text-slate-300 transition-colors">
          作业平台
        </Link>
        <div className="space-x-4">
          <Link href="/" className="hover:text-slate-300 transition-colors">首页</Link>
          <Link href="/github-stats" className="hover:text-slate-300 transition-colors">GitHub 统计</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;