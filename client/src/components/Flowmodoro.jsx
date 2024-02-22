import { Play, Square } from 'lucide-react';
import { useEffect, useState } from 'react';

const Flowmodoro = () => {
  const [time, setTime] = useState(0);
  const [formattedTime, setFormattedTime] = useState('00:00');
  const [mode, setMode] = useState(null);

  useEffect(() => {
    let intervalId = null;

    const updateTime = (increment) => {
      setTime((prevTime) => {
        const newTime = increment ? prevTime + 1 : prevTime - 1;
        setFormattedTime(formatTime(newTime * 1000));
        return newTime;
      });
    };

    if (mode === 'focus') {
      intervalId = setInterval(() => updateTime(true), 1000);
    } else if (mode === 'rest') {
      intervalId = setInterval(() => {
        updateTime(false);
        if (time <= 1) {
          clearInterval(intervalId);
          setMode(null);
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [mode, time]);

  const toggleMode = () => {
    setMode((prevMode) => {
      if (prevMode === 'focus') {
        const newRestTime = Math.floor(time / 5);
        if (newRestTime > 0) {
          setTime(newRestTime);
          setFormattedTime(formatTime(newRestTime * 1000));
          return 'rest';
        }
        setTime(0);
        setFormattedTime('00:00');
        return null;
      } else {
        setTime(0);
        setFormattedTime('00:00');
        return 'focus';
      }
    });
  };

  const formatTime = (time) => {
    if (time >= 3600000) {
      return new Date(time).toISOString().slice(11, 19);
    }
    return new Date(time).toISOString().slice(14, 19);
  };

  return (
    <section className="flex flex-col items-center justify-center max-w-xl gap-3 p-5 mx-auto rounded-lg bg-base-300">
      <h1 className="text-xl font-bold">Flowmodoro</h1>
      <div className="flex flex-col items-center justify-center mx-auto">
        <span>{formattedTime}</span>
        <span>{mode == 'rest' ? 'Break Time' : 'Focus Time'}</span>
      </div>
      <div className="flex gap-2 max-sm:flex-col">
        <button
          className="btn btn-square btn-outline"
          onClick={toggleMode}>
          {mode && <Square />}
          {!mode && <Play />}
        </button>
      </div>
    </section>
  );
};

export default Flowmodoro;
