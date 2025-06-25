'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function GitHubStatsPage() {
  const [commits, setCommits] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllCommits = async () => {
      let allCommits = [];
      let page = 1;
      let hasNextPage = true;

      while (hasNextPage) {
        try {
          const response = await axios.get(`https://api.github.com/repos/mhl556/idex/commits?per_page=100&page=${page}`);
          if (response.data.length > 0) {
            allCommits = [...allCommits, ...response.data];
            page++;
          } else {
            hasNextPage = false;
          }
        } catch (err) {
          setError('无法获取提交记录');
          console.error(err);
          hasNextPage = false; // Stop on error
        }
      }
      setCommits(allCommits);
      setLoading(false);
    };

    fetchAllCommits();
  }, []);

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-8 text-center">
        GitHub 提交历史
      </h1>
      {loading && <p className="text-center">加载中...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && (
        <>
          <p className="text-center text-xl mb-6 font-bold">总提交次数: {commits.length}</p>
          <ul className="space-y-4">
            {commits.map(commit => (
              <li key={commit.sha} className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <p className="font-semibold text-slate-800">{commit.commit.message}</p>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>提交者:</strong> {commit.commit.author.name}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>日期:</strong> {new Date(commit.commit.author.date).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}