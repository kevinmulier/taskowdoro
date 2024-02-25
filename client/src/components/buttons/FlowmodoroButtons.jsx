import { Play, Settings, Square } from 'lucide-react';
import useFlowStore from '../../stores/useFlowStore';

const FlowmodoroButtons = () => {
  const mode = useFlowStore((state) => state.mode);

  const toggleMode = useFlowStore((state) => state.toggleMode);

  return (
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
  );
};

export default FlowmodoroButtons;
