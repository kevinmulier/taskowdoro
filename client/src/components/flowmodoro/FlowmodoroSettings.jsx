import useFlowStore from '../../stores/useFlowStore';

const FlowmodoroSettings = () => {
  const focusBreakRatio = useFlowStore((state) => state.focusBreakRatio);
  const automaticRest = useFlowStore((state) => state.automaticRest);
  const alarmRest = useFlowStore((state) => state.alarmRest);

  const setFocusBreakRatio = useFlowStore((state) => state.setFocusBreakRatio);
  const setAutomaticRest = useFlowStore((state) => state.setAutomaticRest);
  const setAlarmRest = useFlowStore((state) => state.setAlarmRest);

  return (
    <div className="flex flex-col items-center justify-center w-full gap-1">
      <h1 className="mb-1 text-lg font-bold text-center">SETTINGS</h1>
      <div className="form-control">
        <label className="flex items-center gap-8 label">
          Focus/Break ratio
          <input
            type="number"
            className="w-16 input-sm input input-bordered input-focus-break-ratio"
            aria-label="Set Focus Break Ratio"
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
            className="toggle toggle-lg toggle-automatic-rest"
            aria-label="Automatic Rest Switcher"
            checked={automaticRest}
            onChange={() => setAutomaticRest(false)}
          />
        </label>
        <label className="flex items-center gap-8 label">
          End of rest alarm
          <input
            type="checkbox"
            className="toggle toggle-lg toggle-alarm-rest"
            aria-label="Alarm Rest Sound Switcher"
            checked={alarmRest}
            onChange={() => setAlarmRest(false)}
          />
        </label>
      </div>
    </div>
  );
};

export default FlowmodoroSettings;
