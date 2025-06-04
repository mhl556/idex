// app/page.js (或其他页面文件)
import PracticeCard from '@/components/PracticeCard';

export default function HomePage() {
  return (
    <div>
      <h1>我的主页</h1>
      <p>欢迎来到我的Next.js应用。</p>

      {/* 在这里使用 PracticeCard 组件 */}
      <PracticeCard />

      {/* 组件是可复用的，可以多次使用 */}
      <PracticeCard />
      <PracticeCard />
    </div>
  );
}