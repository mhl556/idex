import Link from 'next/link';

function Navbar() {
  return (
    <nav className="bg-slate-100 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex-grow"></div>
        <ul className="flex space-x-4">
          <li><Link href="/" className="text-slate-700 hover:text-slate-900">首页</Link></li>
          <li><Link href="/github-stats" className="text-slate-700 hover:text-slate-900">GitHub 统计</Link></li>
          <li><Link href="/q-anything" className="text-slate-700 hover:text-slate-900">QAnything 问答</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;