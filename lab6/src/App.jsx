import { useState } from 'react';
import StudentRow from './components/StudentRow';

const INITIAL_DATA = [
  { id: 1, name: "Иванов А.С.", grades: [5, 4, 5, 3, 5], average: 4.4 },
  { id: 2, name: "Петрова М.В.", grades: [3, 3, 4, 3, 3], average: 3.2 },
  { id: 3, name: "Злобин А. Н.", grades: [5, 5, 5, 5, 5], average: 5.0 },
  { id: 4, name: "Смирнова Е.А.", grades: [4, 4, 4, 5, 4], average: 4.2 },
  { id: 5, name: "Кузнецов П.П.", grades: [2, 3, 2, 3, 4], average: 2.8 },
];

function App() {
  const [students, setStudents] = useState(INITIAL_DATA);
  const [hoveredId, setHoveredId] = useState(null);

  const moveStudent = (index, direction) => {
    const newStudents = [...students];
    const targetIndex = index + direction;

    if (targetIndex < 0 || targetIndex >= newStudents.length) return;

    const temp = newStudents[index];
    newStudents[index] = newStudents[targetIndex];
    newStudents[targetIndex] = temp;

    setStudents(newStudents);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 font-sans text-slate-800">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Веб-программирование и дизайн</h1>
            <p className="text-slate-500 mt-1">Группа 241-331, Семестр 3</p>
          </div>
          <div className="text-sm text-slate-400">
            Всего студентов: {students.length}
          </div>
        </header>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                <th className="p-4 w-16 text-center">#</th>
                <th className="p-4">Студент</th>
                <th className="p-4 text-center">Оценки</th>
                <th className="p-4 text-center w-32">Успеваемость</th>
                <th className="p-4 w-24"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((student, index) => (
                <StudentRow
                  key={student.id}
                  student={student}
                  index={index}
                  total={students.length}
                  onMove={moveStudent}
                  isHovered={hoveredId}
                  onHover={setHoveredId}
                />
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 flex justify-center gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span> Отлично
            </div>
            <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span> Хорошо
            </div>
            <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500"></span> Плохо
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
