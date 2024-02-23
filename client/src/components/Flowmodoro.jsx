import { Play, Settings, Square } from 'lucide-react';
import { useEffect, useState } from 'react';

const Flowmodoro = () => {
  const [time, setTime] = useState(0);
  const [savedTime, setSavedTime] = useState(0);
  const [formattedTime, setFormattedTime] = useState('00:00');
  const [mode, setMode] = useState(null);
  const [progressStyle, setProgressStyle] = useState({
    '--value': '100',
    '--size': '12rem',
    '--thickness': '1rem',
  });

  useEffect(() => {
    const updateTime = (increment) => {
      setTime((prevTime) => {
        const newTime = increment ? prevTime + 0.01 : prevTime - 0.01;
        setFormattedTime(formatTime(Math.ceil(newTime) * 1000));
        return newTime;
      });
    };

    const transitionToEndOfRest = () => {
      setMode(null);
      setProgressStyle((currentStyle) => {
        return { ...currentStyle, '--value': '100' };
      });
    };

    if (!['focus', 'rest'].includes(mode)) return;

    const intervalId = setInterval(() => {
      updateTime(mode === 'focus');

      if (mode === 'rest') {
        const progress = (((time - 1) / savedTime) * 100).toString();
        setProgressStyle((currentStyle) => {
          return { ...currentStyle, '--value': progress };
        });

        if (time <= 1) {
          clearInterval(intervalId);
          transitionToEndOfRest();
        }
      }
    }, 10);

    return () => clearInterval(intervalId);
  }, [mode, time, savedTime]);

  const toggleMode = () => {
    setMode((prevMode) => {
      const resetTimeAndUI = () => {
        setTime(0);
        setFormattedTime('00:00');
        setProgressStyle((currentStyle) => {
          return { ...currentStyle, '--value': '100' };
        });
      };

      if (prevMode === 'focus') {
        const newRestTime = Math.floor(time * 5);

        if (newRestTime > 0) {
          setTime(newRestTime);
          setSavedTime(newRestTime);
          setFormattedTime(formatTime(newRestTime * 1000));
          return 'rest';
        }

        resetTimeAndUI();
        return null;
      }

      resetTimeAndUI();
      return prevMode === 'rest' ? null : 'focus';
    });
  };

  const formatTime = (time) => {
    if (time >= 3600000) {
      return new Date(time).toISOString().slice(11, 19);
    }
    return new Date(time).toISOString().slice(14, 19);
  };

  return (
    <section className="flex flex-col items-center justify-center w-full max-w-xl gap-5 p-5 mx-auto rounded-lg bg-base-300">
      <h1 className="text-xl font-bold">Flow</h1>
      <div
        className="flex flex-col items-center justify-center mx-auto radial-progress"
        style={progressStyle}
        role="progressbar">
        <span>{formattedTime}</span>
        <span>{mode == 'rest' ? 'Break Time' : 'Focus Time'}</span>
      </div>
      <div className="flex gap-2 max-sm:flex-col">
        <button
          className="btn btn-circle btn-outline"
          onClick={toggleMode}>
          {mode && <Square />}
          {!mode && <Play />}
        </button>
        <button className="btn btn-circle btn-outline">
          <Settings />
        </button>
      </div>
    </section>
  );
};

export default Flowmodoro;
