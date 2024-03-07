import PropTypes from 'prop-types';
import useTaskStore from '../../stores/useTaskStore';
import useFlowStore from '../../stores/useFlowStore';
import { Check, CheckCheck, Play, Square, Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import formatTime from '../../utils/formatTime';

const TodoTask = ({ task }) => {
  const currentTask = useTaskStore((state) => state.currentTask);
  const mode = useFlowStore((state) => state.mode);
  const time = useFlowStore((state) => state.time);
  const pause = useFlowStore((state) => state.pause);

  const deleteTask = useTaskStore((state) => state.deleteTask);
  const checkTask = useTaskStore((state) => state.checkTask);
  const setCurrentTask = useTaskStore((state) => state.setCurrentTask);
  const updateTaskFocusTime = useTaskStore(
    (state) => state.updateTaskFocusTime,
  );

  const toggleMode = useFlowStore((state) => state.toggleMode);
  const resetTimeAndUI = useFlowStore((state) => state.resetTimeAndUI);

  useEffect(() => {
    if (!mode) {
      setCurrentTask();
    }
  }, [mode, setCurrentTask]);

  const launchTask = () => {
    if (!currentTask || currentTask.id !== task.id) {
      resetTimeAndUI(true);
      setCurrentTask(task.id);
    }
    if (currentTask && mode === 'focus') {
      updateTaskFocusTime(time);
    }
    toggleMode();
  };

  const taskStyle = task.completed
    ? 'line-through decoration-2 decoration-double break-all'
    : 'break-all';

  return (
    <tr className="text-center hover">
      <td className="flex justify-center gap-2">
        <button onClick={() => checkTask(task.id)}>
          {!task.completed && (
            <Check
              className="hover:text-base-content/80"
              size={20}
            />
          )}
          {task.completed && (
            <CheckCheck
              className="hover:text-base-content/80"
              size={20}
            />
          )}
        </button>
        <button onClick={launchTask}>
          {currentTask && (currentTask.id !== task.id || !mode || pause) && (
            <Play
              className="hover:text-base-content/80"
              size={20}
            />
          )}
          {currentTask && currentTask.id == task.id && mode && !pause && (
            <Square
              className="hover:text-base-content/80"
              size={20}
            />
          )}
          {!currentTask && (
            <Play
              className="hover:text-base-content/80"
              size={20}
            />
          )}
        </button>
      </td>
      <td className="text-start">
        <span className={taskStyle}>{task.content}</span>
        <span> - {formatTime(task.focusTime * 1000)}</span>
      </td>
      <td className="flex justify-center">
        <button onClick={() => deleteTask(task.id)}>
          <Trash2
            className="hover:text-base-content/80"
            size={20}
          />
        </button>
      </td>
    </tr>
  );
};

export default TodoTask;

TodoTask.propTypes = {
  task: PropTypes.object.isRequired,
};
