import ProgressBar from './ProgressBar';

function StudentRow({ student, index, total, onMove, isHovered, onHover }) {
  const getGradeColor = (grade) => {
    if (grade === 5) return "bg-emerald-100 text-emerald-700 border-emerald-200";
    if (grade === 4) return "bg-blue-100 text-blue-700 border-blue-200";
    if (grade === 3) return "bg-yellow-100 text-yellow-700 border-yellow-200";
    return "bg-rose-100 text-rose-700 border-rose-200";
  };

  return (
    <tr
      className="group transition-all duration-500 ease-in-out hover:bg-slate-50"
      onMouseEnter={() => onHover(student.id)}
      onMouseLeave={() => onHover(null)}
    >
      <td className="p-4 text-center text-slate-400 font-mono text-sm">
        {index + 1}
      </td>
      
      <td className="p-4">
        <div className="font-medium text-slate-700">{student.name}</div>
      </td>

      <td className="p-4">
        <div className="flex gap-2 justify-center flex-wrap">
          {student.grades.map((grade, i) => (
            <span
              key={i}
              className={`
                w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold border
                transition-all duration-300 cursor-default
                ${getGradeColor(grade)}
                ${isHovered === student.id ? 'scale-110 shadow-sm' : 'scale-100'}
              `}
            >
              {grade}
            </span>
          ))}
        </div>
      </td>

      <td className="p-4">
        <div className="flex items-center justify-center gap-3">
          <ProgressBar score={student.average} />
        </div>
      </td>

      <td className="p-4">
        <div className="flex flex-col items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onMove(index, -1)}
            disabled={index === 0}
            className="p-1.5 rounded-md hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed text-slate-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
          </button>
          <button
            onClick={() => onMove(index, 1)}
            disabled={index === total - 1}
            className="p-1.5 rounded-md hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed text-slate-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </button>
        </div>
      </td>
    </tr>
  );
}

export default StudentRow;
