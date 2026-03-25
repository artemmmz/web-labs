import { useState, useEffect } from 'react';

function ProgressBar({ score }) {
  const [offset, setOffset] = useState(125.6);

  useEffect(() => {
    const val = 125.6 - (125.6 * score) / 5;
    setOffset(val);
  }, [score]);

  const getProgressColor = (score) => {
    if (score >= 4.5) return "text-emerald-500";
    if (score >= 3.5) return "text-blue-500";
    return "text-rose-500";
  };

  const colorClass = getProgressColor(score);

  return (
    <div className="relative w-12 h-12">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          className="text-slate-100"
        />
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          strokeDasharray={125.6}
          strokeDashoffset={offset}
          className={`transition-all duration-1000 ease-out ${colorClass}`}
          strokeLinecap="round"
        />
      </svg>
      <span className={`absolute inset-0 flex items-center justify-center text-xs font-bold ${colorClass}`}>
        {score}
      </span>
    </div>
  );
}

export default ProgressBar;
