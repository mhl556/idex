'use client';

import { useEffect, useState } from 'react';

const GitHubStats = ({ repoName }) => {
  const [stats, setStats] = useState(null);
  const [files, setFiles] = useState([]);
  const [commits, setCommits] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!repoName) return;

    const fetchRepoData = async () => {
      setLoading(true);
      try {
        const [statsRes, contentsRes, commitsRes] = await Promise.all([
          fetch(`https://api.github.com/repos/${repoName}`),
          fetch(`https://api.github.com/repos/${repoName}/contents`),
          fetch(`https://api.github.com/repos/${repoName}/commits?per_page=100`) // Fetch more commits
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
      } finally {
        setLoading(false);
      }
    };

    fetchRepoData();
  }, [repoName]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  if (loading) {
    return <div className="text-center p-10">加载中...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">加载出错: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">GitHub 仓库统计</h2>
        <p className="text-lg text-gray-600">{repoName}</p>
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-6 text-center">
            <div className="p-4 bg-blue-100 rounded-lg">
              <p className="text-2xl font-bold text-blue-800">{stats.stargazers_count}</p>
              <p className="text-sm text-blue-600">Stars</p>
            </div>
            <div className="p-4 bg-green-100 rounded-lg">
              <p className="text-2xl font-bold text-green-800">{stats.forks_count}</p>
              <p className="text-sm text-green-600">Forks</p>
            </div>
            <div className="p-4 bg-yellow-100 rounded-lg">
              <p className="text-2xl font-bold text-yellow-800">{stats.watchers_count}</p>
              <p className="text-sm text-yellow-600">Watchers</p>
            </div>
            <div className="p-4 bg-red-100 rounded-lg">
              <p className="text-2xl font-bold text-red-800">{stats.open_issues_count}</p>
              <p className="text-sm text-red-600">Open Issues</p>
            </div>
            <div className="p-4 bg-purple-100 rounded-lg">
              <p className="text-2xl font-bold text-purple-800">{commits.length}</p>
              <p className="text-sm text-purple-600">Commits</p>
            </div>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">文件列表</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 font-semibold text-gray-600">文件名</th>
                  <th className="p-3 font-semibold text-gray-600">类型</th>
                </tr>
              </thead>
              <tbody>
                {files.map(file => (
                  <tr key={file.sha} className="border-b hover:bg-gray-50">
                    <td className="p-3 text-gray-700">{file.name}</td>
                    <td className="p-3 text-gray-500">{file.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">最近提交</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 font-semibold text-gray-600">提交信息</th>
                  <th className="p-3 font-semibold text-gray-600">提交者</th>
                  <th className="p-3 font-semibold text-gray-600">提交时间</th>
                  <th className="p-3 font-semibold text-gray-600">更新时间</th>
                </tr>
              </thead>
              <tbody>
                {commits.slice(0, 10).map(commit => (
                  <tr key={commit.sha} className="border-b hover:bg-gray-50">
                    <td className="p-3 text-gray-700 truncate max-w-[200px]" title={commit.commit.message}>
                      {commit.commit.message}
                    </td>
                    <td className="p-3 text-gray-500">{commit.commit.author.name}</td>
                    <td className="p-3 text-gray-500 whitespace-nowrap">
                      {formatDate(commit.commit.author.date)}
                    </td>
                    <td className="p-3 text-gray-500 whitespace-nowrap">
                      {formatDate(commit.commit.committer.date)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitHubStats;