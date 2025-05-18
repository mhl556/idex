<<<<<<< HEAD
import PracticeCard from '@/components/PracticeCard';
export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-white">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">我的主页</h1>
      <p className="text-lg text-gray-600 mb-8">欢迎来到我的Next.js应用。</p>
      <div className="flex flex-wrap gap-4 justify-center">
        <PracticeCard />
        <PracticeCard />
        <PracticeCard />
      </div>
=======
"use client";
import React, { useEffect, useState } from "react";
import ExerciseCard from "./components/ExerciseCard";

const exercises = [
  {
    title: "第1周作业",
    description: "实现一个响应式导航栏",
    level: "中",
    tags: ["React", "Tailwind", "前端"],
    cover: "https://source.unsplash.com/random/400x200?code",
    deadline: "2024-06-10",
    finished: false
 },
  {
    title: "第2周作业",
    description: "完成一个登录表单组件",
    level: "易",
    tags: ["表单", "组件", "UI"],
    cover: "https://source.unsplash.com/random/400x200?form",
    deadline: "2024-06-17",
    finished: false
  },
  {
    title: "第3周作业",
    description: "实现Todo List并支持本地存储",
    level: "中",
    tags: ["Todo", "本地存储", "实用"],
    cover: "https://source.unsplash.com/random/400x200?todo",
    deadline: "2024-06-24",
    finished: false
  },
  {
    title: "第4周作业",
    description: "制作一个图片轮播组件",
    level: "高",
    tags: ["轮播", "图片", "动画"],
    cover: "https://source.unsplash.com/random/400x200?carousel",
    deadline: "2024-07-01",
    finished: false
  }
];

export default function Home() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch("https://api.github.com/repos/mhl556/idex/contents/")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setFiles(data);
        }
      });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {exercises.map((ex, idx) => (
        <ExerciseCard key={idx} {...ex} files={files} onClick={() => alert(ex.title)} />
      ))}
>>>>>>> 4d1f2f95e36e3d218e52ea8e8c93a85c70759975
    </div>
  );
}