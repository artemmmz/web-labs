
export function Controls({ isRunning, onStart, onPause, onReset }) {
  return (
    <div className="flex justify-center gap-4 mt-8">
      {!isRunning ? (
        <button onClick={onStart} className="px-8 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors cursor-pointer">
          Старт
        </button>
      ) : (
        <button onClick={onPause} className="px-8 py-3 bg-yellow-500 text-white font-bold rounded-xl hover:bg-yellow-600 transition-colors cursor-pointer">
          Пауза
        </button>
      )}
      <button onClick={onReset} className="px-8 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors cursor-pointer">
        Сброс
      </button>
    </div>
  );
}
