import Link from 'next/link';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link href="/">首页</Link></li>
        <li><Link href="/github-stats">GitHub 统计</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;