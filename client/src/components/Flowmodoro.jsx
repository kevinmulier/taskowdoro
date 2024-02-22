import { Play, Square } from 'lucide-react';
import { useEffect, useState } from 'react';

const Flowmodoro = () => {
  const [focusTime, setFocusTime] = useState({
    time: 0,
    formatedTime: '00:00',
  });
  const [isFocused, setIsFocused] = useState(false);

  const [restTime, setRestTime] = useState({
    time: 0,
    formatedTime: '00:00',
  });
  const [isResting, setIsResting] = useState(false);

  useEffect(() => {
    let intervalId = null;

    if (isFocused) {
      setFocusTime({ time: 0, formatedTime: '00:00' });

      intervalId = setInterval(() => {
        setFocusTime((v) => ({
          time: v.time + 1,
          formatedTime: formatTime((v.time + 1) * 1000),
        }));
      }, 1000);
    }

    if (isResting) {
      setFocusTime({ time: 0, formatedTime: '00:00' });

      intervalId = setInterval(() => {
        setRestTime((v) => {
          const newTime = v.time - 1;
          if (newTime <= 0) {
            clearInterval(intervalId);
            setIsResting(false);
            return {
              time: 0,
              formatedTime: '00:00',
            };
          }
          return {
            time: newTime,
            formatedTime: formatTime(newTime * 1000),
          };
        });
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isFocused, isResting]);

  const handleFocus = () => {
    if (isFocused) {
      setIsFocused(false);
      setRestTime({
        time: Math.floor(focusTime.time / 5),
        formatedTime: formatTime((focusTime.time / 5) * 1000),
      });
      return;
    }
    if (isResting) {
      setIsResting(false);
      setRestTime({
        time: 0,
        formatedTime: '00:00',
      });
      return;
    }

    restTime.time ? setIsResting(true) : setIsFocused(true);
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
      {!restTime.time ? (
        <div className="flex flex-col items-center justify-center mx-auto">
          <span>{focusTime.formatedTime}</span>
          <span>Focus Time</span>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mx-auto">
          <span>{restTime.formatedTime}</span>
          <span>Break Time</span>
        </div>
      )}

      <div className="flex gap-2 max-sm:flex-col">
        <button
          className="btn btn-square btn-outline"
          onClick={handleFocus}>
          {(isResting || isFocused) && <Square />}
          {!isFocused && !isResting && <Play />}
        </button>
      </div>
    </section>
  );
};

export default Flowmodoro;
