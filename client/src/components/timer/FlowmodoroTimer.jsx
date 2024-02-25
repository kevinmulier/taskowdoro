import { Play } from 'lucide-react';
import useFlowStore from '../../stores/useFlowStore';

const FlowmodoroTimer = () => {
  const mode = useFlowStore((state) => state.mode);
  const progressStyle = useFlowStore((state) => state.progressStyle);
  const formattedTime = useFlowStore((state) => state.formattedTime);

  const toggleMode = useFlowStore((state) => state.toggleMode);

  return (
    <button
      className="btn btn-circle btn-ghost w-fit h-fit no-animation"
      onClick={toggleMode}>
      <div
        className="mx-auto radial-progress"
        style={progressStyle}
        role="progressbar">
        {!mode && <Play size={50} />}
        {mode && (
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
