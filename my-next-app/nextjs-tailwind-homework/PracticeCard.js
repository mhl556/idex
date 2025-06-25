'use client';

import { useState } from 'react';

export default function PracticeCard({ title, description, date, completed }) {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle = {
    border: `2px solid ${completed ? 'green' : '#eee'}`,
    padding: '16px',
    margin: '10px 0',
    borderRadius: '8px',
    boxShadow: isHovered ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
    transition: 'box-shadow 0.3s ease',
    background: isHovered ? 'linear-gradient(to right, #ff7e5f, #feb47b)' : 'white',
  };

  return (
    <div
      className="practice-card"
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2>{title}</h2>
      <p>{description}</p>
      <p>日期: {date}</p>
      <p>状态: {completed ? '已完成' : '未完成'}</p>
    </div>
  );
}