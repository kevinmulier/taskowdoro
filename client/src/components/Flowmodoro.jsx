import { useEffect } from 'react';
import useFlowStore from '../stores/useFlowStore';
import FlowmodoroButtons from './buttons/FlowmodoroButtons';
import FlowmodoroTimer from './timer/FlowmodoroTimer';
import FlowmodoroSettings from './FlowmodoroSettings';

const Flowmodoro = () => {
  const mode = useFlowStore((state) => state.mode);
  const pause = useFlowStore((state) => state.pause);
  const time = useFlowStore((state) => state.time);
  const startTime = useFlowStore((state) => state.startTime);
  const savedTime = useFlowStore((state) => state.savedTime);
  const settingsOpen = useFlowStore((state) => state.settingsOpen);

  const updateTime = useFlowStore((state) => state.updateTime);
  const updateProgress = useFlowStore((state) => state.updateProgress);
  const resetTimeAndUI = useFlowStore((state) => state.resetTimeAndUI);

  useEffect(() => {
    if (!['focus', 'rest'].includes(mode)) return;
    if (pause) return;

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
  }, [
    mode,
    pause,
    time,
    startTime,
    savedTime,
    resetTimeAndUI,
    updateTime,
    updateProgress,
  ]);

  return (
    <section className="flex flex-col items-center justify-center w-full max-w-md gap-5 p-8 mx-auto rounded-lg bg-base-300">
      <h1 className="text-3xl font-bold">Flow</h1>
      <FlowmodoroTimer />
      <FlowmodoroButtons />
      {settingsOpen && <FlowmodoroSettings />}
    </section>
  );
};

export default Flowmodoro;
