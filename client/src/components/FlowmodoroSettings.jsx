import useFlowStore from '../stores/useFlowStore';

const FlowmodoroSettings = () => {
  const focusBreakRatio = useFlowStore((state) => state.focusBreakRatio);

  const setFocusBreakRatio = useFlowStore((state) => state.setFocusBreakRatio);

  return (
    <div className="flex flex-col w-full gap-1">
      <h1 className="mb-1 text-lg font-bold text-center">SETTINGS</h1>
      <div className="form-control">
        <label className="flex items-center gap-3 label">
          Focus/Break ratio
        </label>
        <input
          type="number"
          className="w-full max-w-xs input input-bordered"
          value={focusBreakRatio}
          onChange={(e) => setFocusBreakRatio(e.target.value)}
          min={0.05}
          max={100}
          step={0.05}
        />
      </div>
    </div>
  );
};

export default FlowmodoroSettings;
