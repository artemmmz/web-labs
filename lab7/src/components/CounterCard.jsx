export function CounterCard({ label, value, colorClass }) {
  return (
    <div className={`flex flex-col items-center justify-center p-6 rounded-2xl shadow-lg border-2 transition-all duration-300 ${colorClass}`}>
      <span className="text-lg font-semibold uppercase tracking-wide text-gray-600">{label}</span>
      <span className="text-5xl font-bold mt-2 text-gray-800">{value}</span>
    </div>
  );
}
