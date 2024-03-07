import { Play, Settings, Square } from 'lucide-react';
import useFlowStore from '../../stores/useFlowStore';
import useTaskStore from '../../stores/useTaskStore';

const FlowmodoroButtons = () => {
  const mode = useFlowStore((state) => state.mode);
  const pause = useFlowStore((state) => state.pause);
  const time = useFlowStore((state) => state.time);
  const currentTask = useTaskStore((state) => state.currentTask);

  const toggleMode = useFlowStore((state) => state.toggleMode);
  const toggleSettings = useFlowStore((state) => state.toggleSettings);
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
    <div className="flex gap-2">
      <button
        className="btn btn-circle btn-outline"
        onClick={handleToggleMode}
        aria-label="Start or stop the Flowmodoro Timer">
        {mode && !pause && <Square />}
        {(!mode || pause) && <Play />}
      </button>
      <button
        className="btn btn-circle btn-outline open-settings-flowmodoro"
        onClick={toggleSettings}
        aria-label="Open or Close settings">
        <Settings />
      </button>
    </div>
  );
};

export default FlowmodoroButtons;
