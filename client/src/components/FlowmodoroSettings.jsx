import useFlowStore from '../stores/useFlowStore';

const FlowmodoroSettings = () => {
  const focusBreakRatio = useFlowStore((state) => state.focusBreakRatio);

  const setFocusBreakRatio = useFlowStore((state) => state.setFocusBreakRatio);

  return (
    <div className="flex flex-col items-center justify-center w-full gap-1">
      <h1 className="mb-1 text-lg font-bold text-center">SETTINGS</h1>
      <div className="form-control">
        <label className="flex items-center gap-3 label">
          Focus/Break ratio
          <input
            type="number"
            className="input input-bordered"
            value={focusBreakRatio}
            onChange={(e) => setFocusBreakRatio(e.target.value)}
            min={1}
            max={100}
            step={0.5}
          />
        </label>
      </div>
    </div>
  );
};

export default FlowmodoroSettings;
