import React from "react";

export default function ExerciseCard({
  title,
  description,
  level,
  tags = [],
  cover,
  deadline,
  finished = false,
  onClick,
  files = []
}) {
  const levelColor = level === "高" ? "bg-red-500" : level === "中" ? "bg-yellow-500" : "bg-green-500";
  return (
    <div className="p-[2px] rounded-xl bg-gradient-to-tr from-rose-400 via-purple-400 to-blue-400 mb-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md flex flex-col hover:shadow-lg transition-shadow overflow-hidden border border-gray-100 dark:border-gray-700">
        {cover && (
          <img src={cover} alt="练习封面" className="w-full h-40 object-cover" />
        )}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
              <span className={`text-xs text-white px-2 py-1 rounded ${levelColor}`}>{level}难度</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">{description}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag, idx) => (
                <span key={idx} className="bg-rose-100 dark:bg-rose-700 text-rose-600 dark:text-rose-100 px-2 py-0.5 rounded text-xs">{tag}</span>
              ))}
            </div>
            {deadline && (
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">截止日期：{deadline}</div>
            )}
            {files && files.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold">GitHub 文件列表：</h4>
                <ul className="list-disc list-inside text-sm">
                  {files.map(file => (
                    <li key={file.sha}>
                      <a href={file.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{file.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={onClick}
              className="px-4 py-2 bg-rose-500 text-white rounded hover:bg-rose-600 transition-colors"
            >
              {finished ? "已完成" : "查看详情"}
            </button>
            {finished && <span className="text-green-500 text-xs ml-2">✔ 已完成</span>}
          </div>
        </div>
      </div>
    </div>
  );
}