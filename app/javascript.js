import React, { useEffect, useState } from "react";
import ExerciseCard from "./components/ExerciseCard";

export default function Home() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch('https://api.github.com/repos/mhl556/idex/contents/')
      .then(res => res.json())
      .then(data => setFiles(data));
  }, []);

  return (
    <ExerciseCard title="GitHub 文件列表" files={files} />
  );
}