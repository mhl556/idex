'use client';

import { useState, useEffect } from 'react';

function WakaTimeStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchWakaTimeStats() {
      try {
        // 您的本地 Worker 地址
        const res = await fetch('http://127.0.0.1:8787/');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setStats(data.data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchWakaTimeStats();
  }, []);

  if (loading) {
    return <div className="text-center text-slate-500">正在加载 WakaTime 数据...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">加载 WakaTime 数据失败: {error}</div>;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">WakaTime 最近7天编程语言统计</h2>
      {stats && stats.languages && stats.languages.length > 0 ? (
        <ul className="space-y-2">
          {stats.languages.slice(0, 5).map((lang, index) => (
            <li key={index} className="flex justify-between items-center bg-slate-50 p-3 rounded-md">
              <span className="font-semibold text-slate-700">{lang.name}</span>
              <span className="text-slate-500">{lang.text}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-slate-500">暂无数据。</p>
      )}
    </div>
  );
}

export default WakaTimeStats;