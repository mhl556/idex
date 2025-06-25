'use client';

import { useEffect, useState } from 'react';

const GitHubStats = ({ repoName }) => {
  const [stats, setStats] = useState(null);
  const [files, setFiles] = useState([]);
  const [commits, setCommits] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!repoName) return;

    const fetchRepoData = async () => {
      try {
        const [statsRes, contentsRes, commitsRes] = await Promise.all([
          fetch(`https://api.github.com/repos/${repoName}`),
          fetch(`https://api.github.com/repos/${repoName}/contents`),
          fetch(`https://api.github.com/repos/${repoName}/commits`)
        ]);

        if (!statsRes.ok || !contentsRes.ok || !commitsRes.ok) {
          throw new Error('Failed to fetch repository data');
        }

        const statsData = await statsRes.json();
        const contentsData = await contentsRes.json();
        const commitsData = await commitsRes.json();

        setStats(statsData);
        setFiles(contentsData);
        setCommits(commitsData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchRepoData();
  }, [repoName]);

  return (
    <div className="p-4 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">GitHub 仓库统计: {repoName}</h2>
      {error && <p className="text-red-500">加载出错: {error}</p>}
      {stats ? (
        <div>
          <p>⭐ Stars: {stats.stargazers_count}</p>
          <p> Forks: {stats.forks_count}</p>
          <p>👀 Watchers: {stats.watchers_count}</p>
          <p>🚨 Open Issues: {stats.open_issues_count}</p>
        </div>
      ) : (
        !error && <p>加载基本信息中...</p>
      )}

      <h3 class="text-xl font-bold mt-6 mb-2">文件列表</h3>
      {files.length > 0 ? (
        <table class="table-auto w-full">
          <thead>
            <tr>
              <th class="px-4 py-2">文件名</th>
              <th class="px-4 py-2">类型</th>
            </tr>
          </thead>
          <tbody>
            {files.map(file => (
              <tr key={file.sha}>
                <td class="border px-4 py-2">{file.name}</td>
                <td class="border px-4 py-2">{file.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !error && <p>加载文件列表中...</p>
      )}

      <h3 class="text-xl font-bold mt-6 mb-2">最近提交</h3>
      {commits.length > 0 ? (
        <table class="table-auto w-full">
          <thead>
            <tr>
              <th class="px-4 py-2">提交信息</th>
              <th class="px-4 py-2">提交者</th>
              <th class="px-4 py-2">提交时间</th>
            </tr>
          </thead>
          <tbody>
            {commits.slice(0, 10).map(commit => ( // Displaying latest 10 commits
              <tr key={commit.sha}>
                <td class="border px-4 py-2">{commit.commit.message}</td>
                <td class="border px-4 py-2">{commit.commit.author.name}</td>
                <td class="border px-4 py-2">{new Date(commit.commit.author.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !error && <p>加载提交历史中...</p>
      )}
    </div>
  );
};

export default GitHubStats;