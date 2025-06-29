'use client';

import GitHubStats from '@/app/components/GitHubStats';

export default function GitHubStatsPage() {
  const repoName = 'mhl556/idex'; // 您可以随时更改这个仓库名称

  return (
    <div>
      <GitHubStats repoName={repoName} />
    </div>
  );
}