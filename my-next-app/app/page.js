import Image from "next/image";
import Greeting from "../components/Greeting";
import PracticeCard from "../components/PracticeCard";
import MyGitHubCalendar from "../components/GitHubCalendar";

export default function Home() {
  const weekOneTitle = "第一周：React 基础";
  const practiceDate = "2024-01-01";

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>每周练习</h1>

        <PracticeCard
          title={weekOneTitle}
          description="学习 React 组件的核心概念和 JSX 基础。"
          date={practiceDate}
          completed={false}
        />

        <PracticeCard
          title="第二周：Props 与 State"
          description="掌握组件间数据传递和内部状态管理。"
          date={practiceDate}
          completed={true}
        />
      </div>

      <MyGitHubCalendar />
    </main>
  );
}