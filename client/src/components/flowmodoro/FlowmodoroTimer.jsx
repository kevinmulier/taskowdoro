import { Play } from 'lucide-react';
import useFlowStore from '../../stores/useFlowStore';
import useTaskStore from '../../stores/useTaskStore';

const FlowmodoroTimer = () => {
  const mode = useFlowStore((state) => state.mode);
  const pause = useFlowStore((state) => state.pause);
  const progressStyle = useFlowStore((state) => state.progressStyle);
  const time = useFlowStore((state) => state.time);
  const formattedTime = useFlowStore((state) => state.formattedTime);
  const currentTask = useTaskStore((state) => state.currentTask);

  const toggleMode = useFlowStore((state) => state.toggleMode);
  const updateTaskFocusTime = useTaskStore(
    (state) => state.updateTaskFocusTime,
  );

  const handleToggleMode = () => {
    if (currentTask && mode === 'focus') {
      updateTaskFocusTime(time);
    }
    toggleMode();
  };

  return (
    <button
      className="btn btn-circle btn-ghost w-fit h-fit no-animation flowmodoro-button"
      onClick={handleToggleMode}>
      <div
        className="mx-auto radial-progress"
        style={progressStyle}
        role="progressbar">
        {!mode && <Play size={50} />}
        {pause && (
          <div className="flex flex-col items-center justify-center gap-1">
            <span className="text-lg font-bold">Start break</span>
            <span className="text-lg">{formattedTime}</span>
          </div>
        )}
        {mode && !pause && (
          <div className="flex flex-col items-center justify-center gap-1">
            <span className="font-mono text-xl">{formattedTime}</span>
            <span className="text-xl font-bold uppercase">
              {mode == 'rest' ? 'Break' : 'Focus'}
            </span>
          </div>
        )}
      </div>
    </button>
  );
};
export default FlowmodoroTimer;
