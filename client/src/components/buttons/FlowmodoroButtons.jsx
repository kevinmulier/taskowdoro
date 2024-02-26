import { Play, Settings, Square } from 'lucide-react';
import useFlowStore from '../../stores/useFlowStore';

const FlowmodoroButtons = () => {
  const mode = useFlowStore((state) => state.mode);
  const pause = useFlowStore((state) => state.pause);

  const toggleMode = useFlowStore((state) => state.toggleMode);
  const toggleSettings = useFlowStore((state) => state.toggleSettings);

  return (
    <div className="flex gap-2">
      <button
        className="btn btn-circle btn-outline"
        onClick={toggleMode}>
        {mode && !pause && <Square />}
        {(!mode || pause) && <Play />}
      </button>
      <button
        className="btn btn-circle btn-outline"
        onClick={toggleSettings}>
        <Settings />
      </button>
    </div>
  );
};

export default FlowmodoroButtons;
