import PropTypes from 'prop-types';
import useTaskStore from '../../stores/useTaskStore';
import useFlowStore from '../../stores/useFlowStore';
import { Play, Square, Trash2 } from 'lucide-react';

const TodoTask = ({ task }) => {
  const currentTask = useTaskStore((state) => state.currentTask);
  const mode = useFlowStore((state) => state.mode);
  const pause = useFlowStore((state) => state.pause);

  const deleteTask = useTaskStore((state) => state.deleteTask);
  const setCurrentTask = useTaskStore((state) => state.setCurrentTask);

  const toggleMode = useFlowStore((state) => state.toggleMode);
  const resetTimeAndUI = useFlowStore((state) => state.resetTimeAndUI);

  const launchTask = () => {
    if (currentTask.id !== task.id) {
      resetTimeAndUI(true);
      setCurrentTask(task.id);
    }
    toggleMode();
  };

  return (
    <tr className="text-center hover">
      <td className="flex justify-center">
        <button onClick={launchTask}>
          {(currentTask.id !== task.id || !mode || pause) && <Play size={20} />}
          {currentTask.id == task.id && mode && !pause && <Square size={20} />}
        </button>
      </td>
      <td className="text-start">{task.content}</td>
      <td className="flex justify-center">
        <button onClick={() => deleteTask(task.id)}>
          <Trash2 size={20} />
        </button>
      </td>
    </tr>
  );
};

export default TodoTask;

TodoTask.propTypes = {
  task: PropTypes.object.isRequired,
};
