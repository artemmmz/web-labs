import { useState, useEffect, useCallback } from 'react';
import { Controls } from './components/Controls';
import { CounterCard } from './components/CounterCard';

function App() {
  const [time, setTime] = useState(() => {
    const saved = localStorage.getItem('gameTime');
    return saved !== null ? Number(saved) : 0;
  });
  const [score, setScore] = useState(() => {
    const saved = localStorage.getItem('gameScore');
    return saved !== null ? Number(saved) : 0;
  });
  const [lives, setLives] = useState(() => {
    const saved = localStorage.getItem('gameLives');
    return saved !== null ? Number(saved) : 5;
  });
  const [isRunning, setIsRunning] = useState(false);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('gameHighScore');
    return saved !== null ? Number(saved) : 0;
  });
  const [resetFlash, setResetFlash] = useState(false);

  useEffect(() => {
    localStorage.setItem('gameTime', time);
    localStorage.setItem('gameScore', score);
    localStorage.setItem('gameLives', lives);
    localStorage.setItem('gameHighScore', highScore);
  }, [time, score, lives, highScore]);

  useEffect(() => {
    let interval = null;
    if (isRunning && lives > 0) {
      interval = setInterval(() => setTime(prev => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, lives]);

  useEffect(() => {
    if (isRunning && time > 0 && time % 5 === 0) setScore(prev => prev + 10);
    if (isRunning && time > 0 && time % 20 === 0 && lives > 0) setLives(prev => prev - 1);
  }, [time]);

  useEffect(() => {
    if (score > highScore) setHighScore(score);
  }, [score, highScore]);

  useEffect(() => {
    if (lives <= 3 && lives > 0) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 440;
        gain.gain.value = 0.1;
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.3);
        osc.stop(ctx.currentTime + 0.3);
      } catch (e) {}
    }
    if (lives === 0) setIsRunning(false);
  }, [lives]);

  const handleStart = useCallback(() => setIsRunning(true), []);
  const handlePause = useCallback(() => setIsRunning(false), []);
  const handleReset = useCallback(() => {
    setTime(0);
    setScore(0);
    setLives(5);
    setIsRunning(false);
    setResetFlash(true);
    setTimeout(() => setResetFlash(false), 300);
  }, []);

  const bgClass = lives <= 1 ? 'bg-red-200' : lives <= 3 ? 'bg-orange-100' : 'bg-blue-50';
  const timerCardClass = score >= highScore && highScore > 0 
    ? 'border-green-400 bg-green-50' 
    : lives <= 2 
    ? 'border-red-300 bg-red-50' 
    : 'border-gray-200 bg-white';

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-500 ${bgClass}`}>
      <div className={`w-full max-w-2xl p-8 rounded-3xl shadow-2xl border-4 transition-all duration-300 ${resetFlash ? 'animate-pulse border-white' : 'border-transparent'} bg-white`}>
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-800">Игровой Таймер</h1>
          <p className="text-gray-500 mt-1">Рекорд: {highScore} очков</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <CounterCard label="Время" value={`${time}с`} colorClass={timerCardClass} />
          <CounterCard label="Очки" value={score} colorClass="border-purple-300 bg-purple-50" />
          <CounterCard label="Жизни" value={lives} colorClass="border-pink-300 bg-pink-50" />
        </div>

        <Controls isRunning={isRunning} onStart={handleStart} onPause={handlePause} onReset={handleReset} />

        {lives === 0 && (
          <div className="mt-6 text-center text-xl font-bold text-red-600 animate-bounce">
            Игра окончена! Нажмите сброс.
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
