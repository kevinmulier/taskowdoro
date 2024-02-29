import { useEffect } from 'react';
import useFlowStore from '../../stores/useFlowStore';
import FlowmodoroButtons from './FlowmodoroButtons';
import FlowmodoroTimer from './FlowmodoroTimer';
import FlowmodoroSettings from './FlowmodoroSettings';
import useTaskStore from '../../stores/useTaskStore';

const Flowmodoro = () => {
  const mode = useFlowStore((state) => state.mode);
  const pause = useFlowStore((state) => state.pause);
  const settingsOpen = useFlowStore((state) => state.settingsOpen);
  const currentTask = useTaskStore((state) => state.currentTask);

  const updateTime = useFlowStore((state) => state.updateTime);
  const updateProgress = useFlowStore((state) => state.updateProgress);
  const resetTimeAndUI = useFlowStore((state) => state.resetTimeAndUI);

  useEffect(() => {
    if (!['focus', 'rest'].includes(mode)) return;
    if (pause) return;

    const intervalId = setInterval(() => {
      updateTime(mode === 'focus');

      if (mode === 'rest') {
        updateProgress();
      }
    }, 10);

    return () => clearInterval(intervalId);
  }, [mode, pause, resetTimeAndUI, updateTime, updateProgress]);

  return (
    <section className="flex flex-col items-center justify-center w-full gap-5 p-8 rounded-lg md:max-w-lg bg-base-300 h-fit">
      <h1 className="text-3xl font-bold">Flow</h1>
      {currentTask && (
        <h2 className="text-xl font-semibold">{currentTask.task}</h2>
      )}
      <FlowmodoroTimer />
      <FlowmodoroButtons />
      {settingsOpen && <FlowmodoroSettings />}
    </section>
  );
};

export default Flowmodoro;
