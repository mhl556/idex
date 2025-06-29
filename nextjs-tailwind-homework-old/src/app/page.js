'use client';

import { useEffect, useState } from 'react';
import PracticeCard from '@/app/components/PracticeCard';
import WakaTimeStats from '@/app/components/WakaTimeStats';

export default function HomePage() {
  const [practices, setPractices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRepoContents() {
      try {
        const response = await fetch('https://api.github.com/repos/mhl556/idex/contents');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // 将 GitHub 仓库内容转换为练习卡片数据
        const practiceItems = data.map((item, index) => ({
          id: index + 1,
          title: item.name,
          description: `GitHub 仓库文件：${item.path}`,
          date: new Date().toLocaleDateString(),
          completed: item.type === 'file',
          link: item.html_url
        }));
        
        setPractices(practiceItems);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchRepoContents();
  }, []);

  if (error) {
    return <div className="text-red-500 text-center p-4">加载失败: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="text-left mb-4">
        <p className="text-sm text-slate-600">提示：页面底部为 WakaTime 统计时长</p>
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-8 text-center">
        每周练习进度
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {practices.map((practice) => (
          <PracticeCard
            key={practice.id}
            title={practice.title}
            description={practice.description}
            date={practice.date}
            completed={practice.completed}
            link={practice.link}
          />
        ))}
      </div>

      <div className="mt-12">
        <WakaTimeStats />
      </div>
    </div>
  );
}