import useFlowStore from '../stores/useFlowStore';

const FlowmodoroSettings = () => {
  const focusBreakRatio = useFlowStore((state) => state.focusBreakRatio);
  const automaticRest = useFlowStore((state) => state.automaticRest);

  const setFocusBreakRatio = useFlowStore((state) => state.setFocusBreakRatio);
  const setAutomaticRest = useFlowStore((state) => state.setAutomaticRest);

  return (
    <div className="flex flex-col items-center justify-center w-full gap-1">
      <h1 className="mb-1 text-lg font-bold text-center">SETTINGS</h1>
      <div className="form-control">
        <label className="flex items-center gap-8 label">
          Focus/Break ratio
          <input
            type="number"
            className="w-16 input input-bordered input-focus-break-ratio"
            value={focusBreakRatio}
            onChange={(e) => setFocusBreakRatio(e.target.value)}
            min={1}
            max={100}
            step={0.5}
          />
        </label>
        <label className="flex items-center gap-8 label">
          Automatic rest
          <input
            type="checkbox"
            className="toggle toggle-automatic-rest"
            checked={automaticRest}
            onChange={setAutomaticRest}
          />
        </label>
      </div>
    </div>
  );
};

export default FlowmodoroSettings;
