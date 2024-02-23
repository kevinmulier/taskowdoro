import { Play, Settings, Square } from 'lucide-react';
import { useEffect } from 'react';
import useFlowStore from '../stores/useFlowStore';

const Flowmodoro = () => {
  const mode = useFlowStore((state) => state.mode);
  const time = useFlowStore((state) => state.time);
  const savedTime = useFlowStore((state) => state.savedTime);
  const formattedTime = useFlowStore((state) => state.formattedTime);
  const progressStyle = useFlowStore((state) => state.progressStyle);

  const toggleMode = useFlowStore((state) => state.toggleMode);
  const updateTime = useFlowStore((state) => state.updateTime);
  const updateProgress = useFlowStore((state) => state.updateProgress);
  const resetTimeAndUI = useFlowStore((state) => state.resetTimeAndUI);

  useEffect(() => {
    if (!['focus', 'rest'].includes(mode)) return;

    const intervalId = setInterval(() => {
      updateTime(mode === 'focus');

      if (mode === 'rest') {
        updateProgress(time, savedTime);

        if (time <= 0.01) {
          clearInterval(intervalId);
          resetTimeAndUI(true);
        }
      }
    }, 10);

    return () => clearInterval(intervalId);
  }, [mode, time, savedTime, resetTimeAndUI, updateTime, updateProgress]);

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
      <div className="flex gap-2">
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
