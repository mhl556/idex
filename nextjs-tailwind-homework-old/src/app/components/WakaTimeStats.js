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
      <h2 className="text-2xl font-bold text-slate-800 mb-4">WakaTime 编程统计</h2>
      
      {/* 总编码时长显示 */}
      {stats && stats.total_seconds && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">总编码时长</h3>
          <div className="text-3xl font-bold text-blue-600">
            {stats.human_readable_total || '计算中...'}
          </div>
          <div className="text-sm text-blue-500 mt-1">
            总计 {Math.round(stats.total_seconds / 3600)} 小时
          </div>
        </div>
      )}

      {/* 编程语言统计 */}
      <h3 className="text-lg font-semibold text-slate-700 mb-3">编程语言分布</h3>
      {stats && stats.languages && stats.languages.length > 0 ? (
        <ul className="space-y-2">
          {stats.languages.slice(0, 5).map((lang, index) => (
            <li key={index} className="flex justify-between items-center bg-slate-50 p-3 rounded-md">
              <span className="font-semibold text-slate-700">{lang.name}</span>
              <div className="text-right">
                <span className="text-slate-500">{lang.text}</span>
                <div className="text-xs text-slate-400">
                  {((lang.total_seconds / stats.total_seconds) * 100).toFixed(1)}%
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-slate-500">暂无编程语言数据。</p>
      )}

      {/* 其他统计信息 */}
      {stats && (
        <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
          {stats.daily_average && (
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="font-semibold text-green-800">日均编码</div>
              <div className="text-green-600">{stats.daily_average}</div>
            </div>
          )}
          {stats.best_day && (
            <div className="bg-purple-50 p-3 rounded-lg">
              <div className="font-semibold text-purple-800">最佳单日</div>
              <div className="text-purple-600">{stats.best_day.text}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default WakaTimeStats;