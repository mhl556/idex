'use client';

export default function PracticeCard({ title, description, date, completed, link }) {
    const cardClasses = `
      bg-white
      rounded-lg
      shadow-lg
      p-6
      m-4
      transition-all
      duration-300
      ease-in-out
      hover:shadow-xl
      hover:-translate-y-1
      border-2
      cursor-pointer
      ${completed ? 'border-green-500' : 'border-slate-200'}
    `;
  
    const titleClasses = `
      text-xl
      font-semibold
      mb-2
      truncate
      ${completed ? 'text-green-700' : 'text-slate-800'}
    `;
  
    const statusTextClasses = `
      text-sm
      font-medium
      ${completed ? 'text-green-600' : 'text-orange-500'}
    `;

    const handleClick = () => {
        if (link) {
            window.open(link, '_blank');
        }
    }
  
    return (
      <div className={cardClasses} onClick={handleClick}>
        <h2 className={titleClasses} title={title}>{title}</h2>
        <p className="text-slate-600 text-sm mb-3 min-h-[40px]">{description}</p>
        {date && <p className="text-xs text-slate-400 mb-3">日期: {date}</p>}
        <p className={statusTextClasses}>
          状态: {completed ? '文件 ✔' : '目录 📂'}
        </p>
      </div>
    );
  }